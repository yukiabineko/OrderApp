import React, {useState} from 'react';
import './Order.css';
import { connect } from 'react-redux';


const ChangeMoney = (props)=>{
  const closeChangeModal = (money)=>{
    let changeModal  = document.getElementById('changeModal');
    changeModal.style.transition="0.7s ease-in-out";
    changeModal.style.transform="translateX(200%)";

    let backArea = document.getElementById('orderBack2');
    backArea.style.display = 'none';
    
    props.parentResetCahange();
    props.parentOderDelete();

  }
  return(
    <div>
      <div className="text-center font-weight-bold h4 mt-2">[お釣り]</div>
      <div className="border-top mt-3"></div>
        <div className="row">
            <div className="col-md-8 offset-2">
              <div className="text-dark text-center font-weight-bold mb-2">ありがとうございます。</div>
              <div className="text-danger text-center pt-2 pb-2 font-weight-bold h2 mb-2">
                {"おつり" + props.sendChangeMoney + "円"}
              </div>
              <div className="text-center">
                <button className="btn btn-secondary" onClick={closeChangeModal}>閉じる</button>
              </div>
            </div>
        </div>
      
    </div>

  );
}
export default connect()(ChangeMoney);