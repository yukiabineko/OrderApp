import React, { useRef } from 'react';
import { connect } from 'react-redux';
import Item from './Item';
import ModalWindow from '../ModalWindow';


const Menu = (props)=>{
  const childRef = useRef();

  let parentModal = (num)=>{
     childRef.current.openModal();
  }
  let items = props.mode === 'default' ?
   props.data.map((value, i)=>(
     <Item key={value.message} value={value} index={i} parent={(num)=>parentModal(num)} />
   ))
   :
   props.fdata.map((value, i)=>(
    <Item key={value.message} value={value} index={i} parent={(num)=>parentModal(num)} />
  ))
  
  return(
    <div>
      <p>{props.message}</p>
      <ModalWindow  ref={childRef} />
      <table className="table table-bordered">
        <thead>
          <tr>
            <th className="bg-dark text-white text-center">NO</th>
            <th className="bg-dark text-white text-center">商品名</th>
            <th className="bg-dark text-white text-center">価格</th>
            <th className="bg-dark text-white text-center">カテゴリー</th>
            <th className="bg-dark text-white text-center"></th>
          </tr>
        </thead>
        <tbody>
          {items}
        </tbody>
      </table>
    </div>
  );
}
export default connect((state)=>state)(Menu)