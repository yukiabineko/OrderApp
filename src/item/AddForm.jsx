import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addmemo } from '../data/Store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { withRouter } from 'react-router';


const buttonStyle={
  border: 'none'
}

const AddForm = (props)=>{
  const [state, setState] = useState({
    name: '',
    price: '',
    category: '飲み物'
  });
  const childCloseMenu = ()=>{
    props.parentCloseMenu();
  }
  const doChange = (event)=>{
    switch (event.target.name) {
      case 'name':
        setState({
          name: event.target.value,
          price: state.price,
          category: state.category
        })
        break;
      case 'price':
        setState({
          name: state.name,
          price: event.target.value,
          category: state.category
        })
        break;
      case 'category':
        setState({
          name: state.name,
          price: state.price,
          category: event.target.value
        })
        break;
    
      default:
        break;
    }
  }
  const doSubmit = (event)=>{
    event.preventDefault();
    if(state.name !=="" && state.price !=="" && state.category !==""){
      let action = addmemo(state.name, state.price, state.category);
      props.dispatch(action);
      setState({
        name: '',
        price: '',
        category: ''
      });
      childCloseMenu();
    }
    else{
      alert('未入力項目があります。');
    }
   
  }
  return(
    <div className="item-form-area">
      <div className="text-right text-dark  mb-1 mt-5">
        <button onClick={childCloseMenu} className="text-danger closeButton" style={buttonStyle}>
          <FontAwesomeIcon icon={faTimesCircle} size="2x"/>
        </button></div>
      <div className="text-center text-dark h1 mb-3 mt-5">登録フォーム</div>
      <div className="row">
        <div className="col-md-10 offset-1 p-5">
          <form onSubmit={doSubmit}>

             <div className="form-group">
               <label>商品名</label>
               <input type="text" name="name" className="form-control" onChange={doChange} value={state.name} required />
             </div>
             <div className="form-group">
               <label>価格</label>
               <input type="number" name="price" className="form-control" onChange={doChange} value={state.price} min="1" step="1" />
             </div>
             <div className="form-group">
               <label>カテゴリー</label>
               <select name="category" className="form-control" onChange={doChange} value={state.category} >
                  <option value="">--選択してください--</option>
                  <option value="飲み物">飲み物</option>
                  <option value="軽食">軽食</option>
               </select>
             </div>
             <div className="text-center mt-5">
               <input type="submit" value="追加" className="btn btn-primary w-25" />
             </div>

          </form>
        </div>
      </div>
    </div>
  );
}
export default  withRouter(connect((state=>state))(AddForm))
