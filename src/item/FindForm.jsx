import React, { useState } from 'react';
import { connect } from 'react-redux'; 
import { searchmemo } from '../data/Store';
import { withRouter } from 'react-router';

const FindForm = (props)=>{
 
  const[state, setState] = useState({
    number :0,
    params : ''    //検索パラメーター
  })
  //*****カテゴリー方分岐NO変更

  const selectChange = (event)=>{       
    setState({number: event.target.value});
  }
  //****検索パラメーターstate格納****

  const seachParameter = (event)=>{
     setState({number: state.number, params: event.target.value});
    
  }
  //*****検索送信*********

  const sendData = (event)=>{
    event.preventDefault();
   
    let action = searchmemo(state.params, state.number);  //検索ワードパラメーターと検索カテゴリー
    props.dispatch(action);
    numberSend();
    
    setState({
      number: 0,
      params: ''
    })
  
  }
  const numberSend = ()=>{
    props.parentNumber(1);
  }
  
  return(
    <div className="row">
      <div className="col-md-11 offset-1 p-3  border-secondary">

        <form className="form-inline border-bottom p-3 bg-white" onSubmit={sendData}>
            <label  className="font-weight-bold mr-3">商品検索:</label>
            <select className="form-control mr-3 bg-light" onChange={selectChange} value={state.number}>
              <option>--検索方法を選んでください。</option>
              <option  value="1">価格で検索</option>
              <option value="2">カテゴリーで検索</option>
              <option value="3">名前一部で検索</option>
            </select>


            {/***************************検索分岐***************************************** */}
            
            {state.number === '1' ?
         
            <div className="form-group">
              <label>価格検索:</label>
              <input 
                type="number" 
                name="price"
                placeholder="金額入力ください。"
                className="form-control mr-2 bg-light" 
                value ={state.params}
                onChange={seachParameter}

              />
              <input type="submit" value="検索" className="btn btn-success s-bt1" />
           </div>
            : 
            state.number === '2' ?

              <div className="form-group">
                <label>カテゴリー検索:</label>
                <select className="form-control bg-light mr-3" onChange={seachParameter}>
                  <option>--カテゴリー選択ください--</option>
                  <option value="軽食">軽食</option>
                  <option value="飲み物">飲み物</option>
                </select>
                <input type="submit" value="検索" className="btn btn-success s-bt2" />
            </div>
            :
            state.number === '3'?

            <div className="form-group">
              <label>名前検索:</label>
              <input
                type="text" 
                name="category"
                className="form-control mr-2 bg-light" 
                placeholder="商品名一部入力ください。"
                value ={state.params}
                onChange={seachParameter}

               />
              <input type="submit" value="検索" className="btn btn-success s-bt3" />
           </div>
            :
           <div></div>
            }
            
        </form>  
      </div>
    </div>
  )
}
export default  withRouter(connect((state=>state))(FindForm))