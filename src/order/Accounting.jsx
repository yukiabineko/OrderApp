import React from 'react';
import './Order.css';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCashRegister, faHamburger, faCoffee } from '@fortawesome/free-solid-svg-icons'


const Accounting = (props)=>{
  const pareantOpenModal = ()=>{
    let modal = document.getElementById('AcoountingModal');
    modal.style.transition="0.3s ease-in-out";
    modal.style.transform="translateY(0%)";

    let backArea = document.getElementById('orderBack2');
    backArea.style.display = 'block';

  }
  return(
    <div>
      <div className="text-center h2 text-primary font-weight-bold mb-3">
         <FontAwesomeIcon icon={faCashRegister} /> 商品精算
      </div>
      
      {props.viewData.length === 0? 
        <div className="bg-secondary text-white h3 font-weight-bold p-5">精算するオーダーがありません。</div>
        :
        <div className="main">
          <div className="row">
            <div className="col-md-2 mt-1 h5 font-weight-bold"> 合計金額:</div>
            <div className="col-md-8 p-2 mr-5 bg-dark text-warning h3 font-weight-bold text-right rounded">{props.totalPrice}<span className="font-weight-bold text-white">円</span></div>
          </div>
          <div className="border-bottom p-1 m-1"></div>
          <button className="btn btn-primary w-50 border-white p-3 font-weight-bold" onClick={pareantOpenModal}>精算</button>
          <label className="ml-3 mt-5 font-weight-bold">買上点数<span className="text-danger">5</span>点</label>
        
        <div className="item-table">
          <table className="table mt-3">
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
      </div>
      }
      
    </div>
  );
}

export default connect()(Accounting)