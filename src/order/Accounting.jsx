import React from 'react';
import './Order.css';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCashRegister } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';

const st ={
  marginBottom: '1.5vh'
}


const Accounting = (props)=>{
  const[state, setState] = useState({
    box: 'on'
  });
  const pareantOpenModal = ()=>{
    let modal = document.getElementById('AcoountingModal');
    modal.style.transition="0.3s ease-in-out";
    modal.style.transform="translateY(0%)";

    let backArea = document.getElementById('orderBack2');
    backArea.style.display = 'block';

  }
  const rightView =(event)=>{
    
    let f = event.target.checked
    setState({
      box: f ?'on' : ''
    })
    
    props. parentRight(f);
    if(f && props.viewData.length >0){
      /*main.style.overflow = 'hidden';*/
      
    }
    else if(!f && props.viewData.length >0){
       /*main.style.overflow = 'hidden';*/
    }
  }
  //親コンポーネントに削除アイテム番号送信

  const deleteOrderItem =(number)=>{
    const result = window.confirm('削除してもよろしいでしょうか？');
    if(result){
      props.parentDeleteItem(number);
    }
  }
  return(
    <div class="accouding-main">
      <div className="text-right">
        <input type="checkbox" checked={state.box} onChange={rightView} />一覧表示
      </div>
      <div className="text-center h2 text-primary font-weight-bold mb-4">
         <FontAwesomeIcon icon={faCashRegister} /> 商品精算
      </div>
      
      {props.viewData.length === 0? 
         <div className="main" id="main">
            <div style={st} ></div>
          <div className="bg-secondary text-white h5 font-weight-bold p-5 ml-3 not-accouding">精算するオーダーがありません。</div>
         </div>
        :
        <div className="main" id="main">
          <button className="btn btn-primary  border-white  font-weight-bold accounding-btn" onClick={pareantOpenModal}>
            <FontAwesomeIcon icon={faCashRegister} size="2x" />&thinsp; 
            精算
          </button>
          <label className="ml-3 mt-5 font-weight-bold">買上点数<span className="text-danger">{props.viewData[props.waitno].length}</span>点</label>
        
        <div className="item-tables bg-light" >
          <table className="table table-bordered mt-3 itemtable2">
          <thead>
            <tr>  
              <th className="bg-dark text-center text-white">商品名</th>
              <th className="bg-dark text-center text-white">価格</th>
              <th className="bg-dark text-center text-white"></th>
            </tr>
          </thead>
          <tbody>
          
            {props.viewData[props.waitno].map((value,i)=>(
              <tr>
                <td className="font-weight-bold text-center bg-white align-middle h4 w-50">{value.name}</td>
                <td className="font-weight-bold text-center bg-white align-middle h4 text-danger">{value.price}</td>
                <td className="font-weight-bold text-center bg-white align-middle h4">
                  <button className="btn btn-danger btn-block" onClick={()=>deleteOrderItem(i)}>削除</button>
                </td>
              </tr>
            ))
          }
          </tbody>
        </table>
        </div>
        <br/>
      </div>
      }
      
    </div>
  );
}

export default connect()(Accounting)