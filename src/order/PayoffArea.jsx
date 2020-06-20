import React, {useState} from 'react';
import './Order.css';
import { connect } from 'react-redux';


const PayoffArea = (props)=>{
   const [state, setstate] = useState({
      inputPrice: ''
   });
  const setPrice = (event)=>{
    setstate({
      inputPrice: event.target.value
    });
  }
  const closeModal =()=>{
    let modal = document.getElementById('AcoountingModal');
    modal.style.transition="0.3s ease-in-out";
    modal.style.transform="translateY(-150%)";

    let backArea = document.getElementById('orderBack2');
    backArea.style.display = 'none';
    setstate({
      inputPrice: ''
    })
  }
  const sendEarnings = (event)=>{
    event.preventDefault();
    closeModal();
    let changeModal  = document.getElementById('changeModal');
    changeModal.style.transition="0.3s ease-in-out";
    changeModal.style.transform="translateY(0%)";

    let changeMoney    = Number(state.inputPrice) -  Number(props.sendModalTotalMoney);
    props.sendAccountingSubmit(changeMoney);  //親コンポーネントへ。
    
  }
  return(
    <div>
      <div className="text-center font-weight-bold h4 mt-2">[お会計]</div>
      <div className="border-top mt-3"></div>
      <div className="row mt-3">
        <div className="col-md-5 offset-1 bg-dark text-white pt-2 pb-2 font-weight-bold">お買い上げ金額：</div>
        <div className="col-md-5 bg-dark  text-right text-warning pt-2 pb-2 font-weight-bold">
          {props.sendModalTotalMoney + "円"}
        </div>
      </div>
      <div className="row mt-3">
          <div className="col-md-10 offset-1 bg-white shadow p-3">
            <form onSubmit={sendEarnings}>
              <div className="form-group ">
                <label>お預かり金額</label>
              < input 
                type="number" 
                onChange={setPrice}
                className="form-control" 
                min="1" step="1" 
                value={state.inputPrice}
                required placeholder="金額を入力ください。" />
              </div>
              <div className="text-center">
                <button className="btn btn-success mr-3">精算する</button>
                <button className="btn btn-danger" onClick={closeModal}>取り消し</button>
              </div>
            </form>
          </div>
        </div>
        <p></p>
    </div>
    
  );
}
export default connect()(PayoffArea);