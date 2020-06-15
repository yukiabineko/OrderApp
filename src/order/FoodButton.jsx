import React from 'react';
import { connect } from 'react-redux';
import { foodData } from '../data/Search';

const FoodButton = (props)=>{
  const foods = foodData(props.data);
  const sendData = (name, price)=>{
    props.sendFoodData({name: name, price: price});
 } 
  return(
    <div>
      <p>軽食一覧</p>
      {foods.map((value, i)=>(
        <button 
          key={'bt'+i} 
          className="btn btn-primary btn-block mb-3"
          onClick={()=>sendData(value.name, value.price)}
          >{value.name}</button>
      ))}
    </div>
  );
}
export default connect((state)=>state)(FoodButton);