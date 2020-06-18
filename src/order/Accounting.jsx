import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCashRegister, faHamburger, faCoffee } from '@fortawesome/free-solid-svg-icons'


const Accounting = (props)=>{
 

  const itemPrice = ()=>{
    let accountingPrice = 0;
    props.viewData[props.waitno].forEach((data)=>{
    accountingPrice += Number(data.price);
    });
    return accountingPrice;
    
  }
  return(
    
    <div>
      <div className="text-center h2 text-primary font-weight-bold mb-5">
         <FontAwesomeIcon icon={faCashRegister} /> 商品精算
      </div>
      
      {props.viewData.length === 0? 
        <div className="bg-secondary text-white h3 font-weight-bold p-5">精算するオーダーがありません。</div>
        :
        <div>
          <div className="row">
            <div className="col-md-2 mt-2 h5 font-weight-bold"> 合計金額:</div>
            <div className="col-md-8 p-2 mr-5 bg-dark text-warning h3 font-weight-bold text-right rounded">{props.totalPrice}<span className="font-weight-bold text-white">円</span></div>
          </div>
          <div className="border-bottom p-1 m-3"></div>
          <div className="text-center h3 font-weight-bold">お買い上げ商品</div>
          <button className="btn btn-primary w-50 border-white p-3 font-weight-bold">精算</button>
          <label className="ml-3 mt-5 font-weight-bold">買上点数<span className="text-danger">5</span>点</label>
        
          <table className="table mt-2">
          <thead>
            <tr>
              <th className="bg-dark text-center text-white"></th>
              <th className="bg-dark text-center text-white">商品名</th>
              <th className="bg-dark text-center text-white">価格</th>
            </tr>
          </thead>
          <tbody>
          
            {props.viewData[props.waitno].map((value)=>(
              <tr>
               {value.category === '軽食'? 
                 <td className="font-weight-bold text-center bg-white align-middle">
                   <p></p>
                   <div><FontAwesomeIcon icon={faHamburger} size="2x" /></div>
                   <p>{value.category}</p>
                 </td>
                 : 
                 <td className="font-weight-bold text-center bg-white align-middle">
                    <p></p>
                    <div><FontAwesomeIcon icon={faCoffee} size="2x" /></div>
                    <p>{value.category}</p>
                 </td>
                }
                <td className="font-weight-bold text-center bg-white align-middle h4">{value.name}</td>
                <td className="font-weight-bold text-center bg-white align-middle h4 text-danger">{value.price}</td>
                
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