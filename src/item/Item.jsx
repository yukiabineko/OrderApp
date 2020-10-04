import React, { useState } from 'react';
import { connect } from 'react-redux';
import { deletememo } from '../data/Store';
import { editmemo } from '../data/Store';
import Modal from 'react-modal';
import { pageButtonColorSet } from './buttonReset';


Modal.setAppElement('#root') //任意のアプリを設定する　create-react-appなら#root

const customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.75)'
  },
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    width                 : '50%',
    bottom                : 'auto',
    marginRight           : '-50%',
    borderRadius　　　　　　: '4px',
    background            : '#f0f0f0',
    padding               : '10px',
    transform             : 'translate(-50%, -50%)'
 }
};


const Item = (props)=>{
  const [state, setState] = useState({
    modalIsOpen: false,
    name: props.value.name,
    price: props.value.price,
    category: props.value.category
  });
  //削除機能

  const delItem = (num)=>{
    let result = window.confirm('削除しますか？');
    if(result){
      let action = deletememo(num);
      props.dispatch(action);
      pageButtonColorSet();
    }
    
  }
  const afterOpenModal =()=> {
   
  }
  //モーダル閉じる

  const closeModal= ()=>{
    setState({modalIsOpen: false});
  }
  //モーダル開く

  const  openModal =(num) =>{
    setState({modalIsOpen: true});
  }
  const doChange = (event)=>{
    switch (event.target.name) {
      /*入力されたフォームで分岐*/
      case 'name':
        setState({
          modalIsOpen: state.modalIsOpen,
          name: event.target.value,
          price: state.price,
          category: state.category
        });
        break;
      case 'price':
        setState({
          modalIsOpen: state.modalIsOpen,
          name: state.name,
          price: event.target.value,
          category: state.category
        });
        break;
      case 'category':
        setState({
          modalIsOpen: state.modalIsOpen,
          name: state.name,
          price: state.price,
          category: event.target.value
        });
        break;
    
      default:
        break;
    }
  }
  //編集機能

  const doSubmit = (event)=>{
    event.preventDefault();       
    let name = state.name === undefined ?props.value.name : state.name   //←変更ない場合state undefinedになるのでpropsを代入
    let price = state.price === undefined ?props.value.price : state.price
    let category = state.category === undefined ?props.value.category : state.category

    if(state.name !=="" && state.price !=="" && state.category !==""){
      let action = editmemo(props.index, name, price, category);
      props.dispatch(action);
      closeModal();
      pageButtonColorSet();
    }
    else{
       alert('未入力項目があります。')
    }
   
  }
  return(
  
      <tr>
        <td className="text-center bg-white">{props.index+1}</td>
        <td className="text-center bg-white">{props.value.name}</td>
        <td className="text-center bg-white">{props.value.price}</td>
        <td className="text-center bg-white">{props.value.category}</td>
        <td className="text-center bg-white">
          <button id={"item"+props.index} className="btn btn-danger mr-3" onClick={()=>delItem(props.index)}>削除</button>
          <button id={"item"+props.index} className="btn btn-primary mr-3" onClick={()=>openModal(props.index)}>編集</button>
          <Modal
          isOpen={state.modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="text-right"><button onClick={closeModal} className="font-weight-bold h4 border border-0">ⓧ</button></div>
          <div className="text-center text-primary font-weight-bold h4 mb-3">{props.value.name + "編集"}</div>
          <div className="border-top mb-3"></div>
          <div className="row">
            <div className="col-md-10 offset-1 p-5 bg-light shadow">
               <form onSubmit={doSubmit}>
                 <div className="form-group">
                   <label>商品名</label>
                   <input
                      type="text"
                      name="name"
                      className="form-control"
                      required
                      value={state.name ==null ?props.value.name : state.name}
                      onChange={doChange}
                    />
                 </div>
                 {/*価格*/}

                 <div className="form-group">
                   <label>価格</label>
                   <input
                      type="number"
                      name="price"
                      className="form-control"
                      min="1"
                      required
                      value={state.price ==null ?props.value.price : state.price}
                      onChange={doChange}
                    />
                 </div>

                  {/*カテゴリー*/}

                  <div className="form-group mb-5">
                   <label>カテゴリー</label>
                   <select className="form-control" value={state.category ==null ?props.value.category : state.category} onChange={doChange} name="category">
                      <option value="">--選択してください--</option>
                      <option value="飲み物">飲み物</option>
                      <option value="軽食">軽食</option>
                   </select>
                 </div>
                 {/*送信ボタン*/}
                <div className="text-center">
                  <input type="submit" value="編集" className="btn btn-primary w-25" />
                </div>
               </form>
            </div>
          </div>
        </Modal>
        </td>
      </tr>

  
  );
}
export default connect((state)=>state)(Item)