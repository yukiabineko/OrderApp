import React from 'react';
import { connect } from 'react-redux';

const Accounting = (props)=>{
  
  return(
    <div>
      <div className="text-center h2 text-primary font-weight-bold mb-5">商品精算</div>
      
      {props.viewData.length === 0? 
        <div className="bg-secondary text-white h3 font-weight-bold p-5">精算するオーダーがありません。</div>
        :
        <div>
          <div className="row">
            <div className="col-md-2 mt-1 font-weight-bold">合計金額:</div>
            <div className="col-md-8 p-2 bg-dark text-warning h3 font-weight-bold text-right">1000<span className="font-weight-bold text-white">円</span></div>
          </div>
          <div className="border-bottom p-1 m-3"></div>
          <button className="btn btn-primary w-50 border-white p-3 font-weight-bold">精算</button>
          <label className="ml-3 mt-5 font-weight-bold">買上点数<span className="text-danger">5</span>点</label>
        
          <table className="table mt-2">
          <thead>
            <tr>
              <th className="bg-dark text-center text-white">商品名</th>
              <th className="bg-dark text-center text-white">価格</th>
            </tr>
          </thead>
          <tbody>
          {props.viewData[0] ===null ?
            props.viewData[0].map((value)=>(
              <tr>
                <td className="font-weight-bold text-center bg-white">{value.name}</td>
                <td className="font-weight-bold text-center bg-white">{value.price}</td>
              </tr>
            ))
            : 
            props.viewData[props.waitno].map((value)=>(
              <tr>
                <td className="font-weight-bold text-center bg-white">{value.name}</td>
                <td className="font-weight-bold text-center bg-white">{value.price}</td>
              </tr>
            ))
          }
          
          </tbody>
        </table>
      </div>
      }
      
    </div>
  );
}

export default connect()(Accounting)