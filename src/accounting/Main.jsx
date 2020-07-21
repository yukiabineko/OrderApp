import React from 'react';
import { setDay, dateObjectCheck } from '../data/Time';
import { connect } from 'react-redux';
import './Accounting.css';
import { useState } from 'react';
import axios from 'axios';
import { PdfExport } from './Pdf.js';
import { excelExport } from './Excel.js';

const Thstyle={width: '10%'};


const viewMenu={
  float: 'right',
  fontWeight: 'bold',
  fontSize:'26px',
  width: '70%',
  marginBottom: '1%'
};

const Main =()=>{
  let obj = JSON.parse(localStorage.getItem('dates'));
 
 
  const[state, setState] = useState({
    flag: obj? true : false,   /* テーブル表示非表示フラグ*/
    data: {}      /* 天気情報*/
  })
  axios.get('//yukiabineko.sakura.ne.jp/apiData.php').then((response)=>{
    let data = response.data;
    let weather = state.data;
    weather['today'] = data['forecasts'][0]['telop'];
    weather['tomorrow'] = data['forecasts'][1]['telop'];
    weather['imageToday'] = data['forecasts'][0]['image']['url'];
    weather['imageTomorrow'] = data['forecasts'][1]['image']['url'];
    setState({
      flag: state.flag,
      data: weather
    })
 });
  
  
    
  let week = [ "日", "月", "火", "水", "木", "金", "土" ];
 
  let array = [];
  let today = setDay();
  let textAccounting = 0;
  if(state.flag === true){
    let data = JSON.parse(localStorage.getItem('dates').slice());
    for(let i=0; i<Object.keys(data).length; i++){
      let key = Object.keys(data)[i];
      let arrayItem = data[key];
      arrayItem['day'] = key; 
      array.push(arrayItem);
     }
     textAccounting = data[today].uriage;
  }
 
  
  const deleteAccounting =()=>{
    if (window.confirm("削除しますか？")) { 
      localStorage.removeItem('dates');
      array = [];
      let weatherData = {};
    
      setState({
        flag: false,
        data: weatherData
      });
      document.location.reload();
    }
  
  }
  /*
  const csvExport =()=>{ //csv出力処理
    const localData = JSON.parse(localStorage.getItem('dates'));    //売り上げデータ
    const keyArray = Object.keys(localData);                        //キー一覧
    const keyCount = keyArray.length;                               //日付キー数
    let csvString = "日付,売り上げ金額,売り上げ点数\n";                //出力用文字列
    for(let i=0; i< keyCount; i++){
      csvString +=
        keyArray[i]
         + "," +
        localData[keyArray[i]]["uriage"]
         + "," +
        localData[keyArray[i]]["number"] +"\n"
    }
    var bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
    let blob = new Blob([bom,csvString], {"type" : "text/csv"});
    document.getElementById('csv_download').href = window.URL.createObjectURL(blob);

  }
  */
 
  return(
    <div className="row">
      <div className="col-md-10 offset-1  mt-5 mb-5 bg-light shadow pb-3">
        {/* pc */}
        
          <table className="table font-weight-bold bg-white mt-4 mb-5 border weather-pc">
            <tbody>
              <tr>
                <td className="text-primary">天気情報</td>
                <td>本日天気</td>
                <td><img src={state.data.imageToday} /></td>
                <td>{state.data.today}</td>
                <td>明日天気</td>
                <td><img src={state.data.imageTomorrow} /></td>
                <td>{state.data.tomorrow}</td>
              </tr>
            </tbody>
          </table>

           {/* phone */}

           <table className="table font-weight-bold bg-white mt-4 mb-5 border weather-phone">
            <tbody>
              <tr>
                <td className="text-primary text-center border" colSpan="3">天気情報</td>
              </tr>
              <tr>
                <td>本日天気</td>
                <td><img src={state.data.imageToday} /></td>
                <td>{state.data.today}</td>
              </tr>
              <tr>
                <td>明日天気</td>
                <td><img src={state.data.imageTomorrow} /></td>
                <td>{state.data.tomorrow}</td>
              </tr>
            </tbody>
          </table>
        <div className="text-center h3 font-weight-bold mt-3 mb-5">[売上げ管理]</div>
        {state.flag ===false ?
        <div className="text-center font-weight-bold text-danger p-5 h4">データがありません。</div> 
        : 
        <div>
           <div className="viewTitle" >本日現在売上げ:</div>
            <div className="viewMenu">
              <span className="ml-3 accouting-money-label"><span className="text-danger">{textAccounting}</span>円</span>
              <div className="button-center"></div>
              <button className=" btn btn-danger  reset-bt" onClick={deleteAccounting}>リセット</button>
              <button className=" btn btn-success csv-bt" onClick={excelExport}>Exel出力</button>
              <button className=" btn btn-primary  pdf-bt" onClick={PdfExport}>PDF出力</button>
           </div>
           <table className="table table-bordered">
          <thead>
            <th className="bg-dark text-center text-white" style={Thstyle}>日付</th>
            <th className="bg-dark text-center text-white" style={Thstyle}>曜日</th>
            <th className="bg-dark text-center text-white">売り上げ金額</th>
            <th className="bg-dark text-center text-white">売上げ点数</th>
          </thead>
          <tbody>
            {array.map((value)=>(
              <tr>
               <td className="font-weight-bold text-center">{value.day}</td>
               <td className="font-weight-bold text-center">{week[new Date(value.created).getDay()]}</td>
               <td className="font-weight-bold text-center">{value.uriage}</td>
               <td className="font-weight-bold text-center">{value.number}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>

        }
     </div>
    </div>
  );
}
export default connect()(Main)