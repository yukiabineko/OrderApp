import React from 'react';
import { connect } from 'react-redux';
import { deletememo } from '../data/Store';


const Item = (props)=>{
  const delItem = (num)=>{
    let action = deletememo(num);
    props.dispatch(action);
  }
  const editItem = (num)=>{
   props.parent(num);
  }
  return(
  
      <tr>
        <td className="text-center bg-white">{props.index}</td>
        <td className="text-center bg-white">{props.value.name}</td>
        <td className="text-center bg-white">{props.value.price}</td>
        <td className="text-center bg-white">{props.value.category}</td>
        <td className="text-center bg-white">
          <button id={"item"+props.index} className="btn btn-danger mr-3" onClick={()=>delItem(props.index)}>削除</button>
          <button id={"item"+props.index} className="btn btn-primary mr-3" onClick={()=>editItem(props.index)}>編集</button>
        </td>
      </tr>

  
  );
}
export default connect((state)=>state)(Item)