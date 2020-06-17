import React from 'react';
import './Order.css';
import { connect } from 'react-redux';
import { drinkData } from '../data/Search';
import { useState } from 'react';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Drower2 = (props)=>{
  const[state, setState] = useState({
    name: '',
    price: '',
    category: ''
  })
  const drinks = drinkData(props.data);
  //ステートに追加

  const addItem = (event)=>{
    let data = event.target.value;
    let name = data.split(',')[0];
    let price = data.split(',')[1];
    let category = data.split(',')[2];
    setState({
      name: name,
      price: price,
      category: category
    })

  }
  //親コンポーネントに送信
  const sendData = (event)=>{
    event.preventDefault();
    if(!(state.name ==='')){ 
      props.parentData({name: state.name, price: state.price, category: state.category});
      
    }
    
  }

  return(
   <div>
     {/*...飲み物selectbox...*/}

     <form className="form-inline bg-light" onSubmit={sendData} >
       <label className="mr-3 font-weight-bold pt-4 pb-4">
         <FontAwesomeIcon icon={faCoffee}className="mr-1" size="lg" /> 
         飲物:
       </label>
       <select className="form-control mr-3 w-50" onChange={addItem}   >
         <option></option>
         {drinks.map((value,i)=>(
           <option key={'drink'+i} value={value.name + ',' + value.price + ',' + value.category}>{value.name}</option>
         ))}
       </select>
       <input type="submit" value="追加" className="btn btn-primary" />
     </form>
   </div>
  );
}

export default connect((state)=>state)(Drower2);