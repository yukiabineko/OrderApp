import React from 'react';
import { setDay, dateObjectCheck } from '../data/Time';
import { connect } from 'react-redux';
import './Accounting.css';
import { useState } from 'react';
import axios from 'axios';

const Thstyle={width: '10%'};


const viewMenu={
  float: 'right',
  fontWeight: 'bold',
  fontSize:'26px',
  width: '70%',
  marginBottom: '1%'
};

const Main =()=>{
  const[state, setState] = useState({
    flag: true,    /* テーブル表示非表示フラグ*/
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
  dateObjectCheck ();
  let data = JSON.parse(localStorage.getItem('dates').slice());
    
  let week = [ "日", "月", "火", "水", "木", "金", "土" ];
 
  let array = [];
  let today = setDay();
  if(state.flag === true){
    for(let i=0; i<Object.keys(data).length; i++){
      let key = Object.keys(data)[i];
      let arrayItem = data[key];
      arrayItem['day'] = key; 
      array.push(arrayItem);
     }
  }
  const textAccounting = data[today].uriage;
  
  const deleteAccounting =()=>{
    if (window.confirm("削除しますか？")) { 
      localStorage.removeItem('dates');
      array = [];
    }
    setState({
      flag: false
    })
  }
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
        {array.length === 0 ?
        <div className="text-center font-weight-bold text-danger p-5 h4">データがありません。</div>
        : 
        <div>
           <div className="viewTitle" >本日現在売上げ:</div>
            <div className="viewMenu">
              <span className="text-danger ml-3">{textAccounting}</span>円
              <button className=" btn btn-danger ml-5" onClick={deleteAccounting}>リセット</button>
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