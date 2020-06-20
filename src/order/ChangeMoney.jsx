import React, {useState} from 'react';
import './Order.css';
import { connect } from 'react-redux';


const ChangeMoney = (props)=>{
   
  return(
    <div>
      <div className="text-center font-weight-bold h4 mt-2">[お釣り]</div>
      <div className="border-top mt-3"></div>
        <div className="row">
            <div className="col-md-8 offset-2">
            <div className="text-dark font-weight-bold mb-2">ありがとうございます。</div>
            <div className="text-danger text-center pt-2 pb-2 font-weight-bold h2">
              {"おつり" + props.sendChangeMoney + "円"}
            </div>
            </div>
        </div>
      
    </div>

  );
}
export default connect()(ChangeMoney);