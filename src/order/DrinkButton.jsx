import React from 'react';
import { connect } from 'react-redux';
import { drinkData } from '../data/Search';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const DrinkButton = (props)=>{
  const drinks = drinkData(props.data);
  const sendData = (name, price, category)=>{
     props.sendDrinkData({name: name, price: price, category: category});
  } 
  return(
    <div>
      <p className="font-weight-bold"><span className="text-primary mr-1"><FontAwesomeIcon icon={faCoffee} size="lg" /></span>飲物一覧</p>
      {drinks.map((value, i)=>(
        <button
         key={'bt'+i} 
         className="btn btn-primary btn-block mb-3 drinkbutton"
         onClick={()=>sendData(value.name, value.price, value.category)}
         >{value.name}</button>
      ))}
    </div>
  );
}
export default connect((state)=>state)(DrinkButton);