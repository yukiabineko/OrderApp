import React from 'react';
import { connect } from 'react-redux';

const Accounting = (props)=>{
  
  return(
    <div>
      <div className="text-center h2 text-primary font-weight-bold mb-5">商品精算</div>
      {props.viewData.length === 0? 
        <div className="bg-secondary text-white h3 font-weight-bold p-5">精算するオーダーがありません。</div>
        :
        <table className="table">
        <thead>
          <tr>
            <th className="bg-dark text-center text-white">商品名</th>
            <th className="bg-dark text-center text-white">価格</th>
          </tr>
        </thead>
        <tbody>
        {props.viewData[0].map((value)=>(
           <tr>
             <td className="font-weight-bold text-center bg-white">{value.name}</td>
             <td className="font-weight-bold text-center bg-white">{value.price}</td>
           </tr>
         ))}
        </tbody>
      </table>
      }
      
    </div>
  );
}

export default connect()(Accounting)