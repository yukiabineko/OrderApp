import React from 'react';
import { connect } from 'react-redux';
import { drinkData } from '../data/Search';

const DrinkButton = (props)=>{
  const drinks = drinkData(props.data);

  return(
    <div>
      <p>飲み物一覧</p>
      {drinks.map((value, i)=>(
        <button key={'bt'+i} className="btn btn-primary btn-block mb-3">{value.name}</button>
      ))}
    </div>
  );
}
export default connect((state)=>state)(DrinkButton);