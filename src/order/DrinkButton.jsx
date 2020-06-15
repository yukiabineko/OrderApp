import React from 'react';
import { connect } from 'react-redux';
import { drinkData } from '../data/Search';

const DrinkButton = (props)=>{
  const drinks = drinkData(props.data);
  const sendData = (name, price)=>{
     props.sendDrinkData({name: name, price: price});
  } 
  return(
    <div>
      <p>飲み物一覧</p>
      {drinks.map((value, i)=>(
        <button
         key={'bt'+i} 
         className="btn btn-primary btn-block mb-3"
         onClick={()=>sendData(value.name, value.price)}
         >{value.name}</button>
      ))}
    </div>
  );
}
export default connect((state)=>state)(DrinkButton);