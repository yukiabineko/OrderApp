import React from 'react';
import { connect } from 'react-redux';
import './Main.css';
import Menu from './Menu';
import AddForm from './AddForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

const Main = (props)=>{
  const closeMenu = ()=>{
   let check = document.getElementById('drower');
   check.checked = false;
  }
  return(
    <div>
      <div className="row">
        <div className="col-md-8 offset-2">
         {props.message === ''? ''
           :
           <div className="alert alert-success mt-5">{props.message}</div>
          }
         
        </div>
      </div>
      
      <div className="text-center text-dark h1 mb-3 mt-5">商品一覧</div>
      
      <div className="row item-row">
        <div className="col-md-10 offset-1 bg-light shadow p-5 list-area">
          <input type="checkbox" id="drower" />
          <label for="drower" id="open" className="text-primary">
            &emsp;<FontAwesomeIcon icon={faPlusCircle} size="2x" />
            <p className="font-weight-bold">新規登録</p>
          </label>
          <label for="drower" id="close"></label>
          <div id="content" className="mt-5">
            <AddForm  parentCloseMenu={closeMenu}/>
          </div>
          
          <Menu />
        </div>
      </div>
    </div>
  );
}
export default connect((state)=>state)(Main)