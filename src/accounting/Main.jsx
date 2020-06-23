import React from 'react';
import { setDay } from '../data/Time';
import { connect } from 'react-redux';

const Main =()=>{
  const data = JSON.parse(localStorage.getItem('dates').slice());
 
  let array = [];
  for(let i=0; i<Object.keys(data).length; i++){
    let key = Object.keys(data)[i];
    let arrayItem = data[key];
    arrayItem['day'] = key; 
    array.push(arrayItem);
  }
  const todayAccounting = data[setDay()].uriage;

  return(
    <div className="row">
      <div className="col-md-10 offset-1  mt-5 bg-light shadow">
        <div className="text-center h3 font-weight-bold mt-3 mb-5">[売上げ管理]</div>
        <ul>
          <li>本日現在売上げ</li>
          <li>{todayAccounting}</li>
        </ul>
        <table className="table table-bordered">
          <thead>
            <th className="bg-dark text-center text-white">日付</th>
            <th className="bg-dark text-center text-white">曜日</th>
            <th className="bg-dark text-center text-white">売り上げ金額</th>
            <th className="bg-dark text-center text-white">売上げ点数</th>
          </thead>
          <tbody>
            {array.map((value)=>(
              <tr>
               <td className="font-weight-bold text-center">{value.day}</td>
               <td className="font-weight-bold text-center"></td>
               <td className="font-weight-bold text-center">{value.uriage}</td>
               <td className="font-weight-bold text-center">{value.number}</td>
              </tr>
            ))}
          </tbody>
        </table>
     </div>
    </div>
  );
}
export default connect()(Main)