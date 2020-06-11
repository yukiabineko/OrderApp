import React from 'react';
import { connect } from 'react-redux';
import { foodData } from '../data/Search';

const FoodButton = (props)=>{
  const foods = foodData(props.data);

  return(
    <div>
      <p>軽食一覧</p>
      {foods.map((value, i)=>(
        <button key={'bt'+i} className="btn btn-primary btn-block mb-3">{value.name}</button>
      ))}
    </div>
  );
}
export default connect((state)=>state)(FoodButton);