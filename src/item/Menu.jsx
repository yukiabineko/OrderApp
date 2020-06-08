import React from 'react';
import { connect } from 'react-redux';
import Item from './Item';

const Menu = (props)=>{
  let items = props.mode === 'default' ?
   props.data.map((value, i)=>(
     <Item key={value.message} value={value} index={i} />
   ))
   :
   props.fdata.map((value, i)=>(
    <Item key={value.message} value={value} index={i} />
  ))
  return(
    <div>
      <p>{props.message}</p>
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