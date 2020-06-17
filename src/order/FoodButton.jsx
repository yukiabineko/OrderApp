import React from 'react';
import { connect } from 'react-redux';
import { foodData } from '../data/Search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHamburger } from '@fortawesome/free-solid-svg-icons';

const FoodButton = (props)=>{
  const foods = foodData(props.data);
  const sendData = (name, price)=>{
    props.sendFoodData({name: name, price: price});
 } 
  return(
    <div>
      <p className="font-weight-bold text-primary"><span className="text-primary mr-1"><FontAwesomeIcon icon={faHamburger} size="lg" /></span>軽食一覧</p>
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