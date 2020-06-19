import React from 'react';
import './Order.css';
import { connect } from 'react-redux';

const buttonStyle={
  border:"none",
  background: "#fff",
  fontSize: "16px",
  fontWeight: 'bold',
  padding: "1% 2%",
  marginRight: "2%",
  outline: "0"
}

const PayoffArea = ()=>{
  const closeModal =()=>{
    let modal = document.getElementById('AcoountingModal');
    modal.style.transition="0.3s ease-in-out";
    modal.style.transform="translateY(-150%)";

    let backArea = document.getElementById('orderBack2');
    backArea.style.display = 'none';
  }
  return(
    <div>
      <div className="text-right mt-1">
        <button style={buttonStyle} onClick={closeModal}>x</button>
      </div>
      <div className="text-center font-weight-bold h4">[お会計]</div>
      <div className="border-top mt-3"></div>
    </div>
  );
}
export default connect()(PayoffArea);