import React from 'react';
import './Order.css';
import { connect } from 'react-redux';
import { drinkData } from '../data/Search';
import { useState } from 'react';


const Drower2 = (props)=>{
  const[state, setState] = useState({
    name: '',
    price: '',
  })
  const drinks = drinkData(props.data);
  //ステートに追加

  const addItem = (event)=>{
    let data = event.target.value;
    let name = data.split(',')[0];
    let price = data.split(',')[1];
    setState({
      name: name,
      price: price
    })

  }
  //親コンポーネントに送信
  const sendData = (event)=>{
    event.preventDefault();
    if(!(state.name ==='')){ 
      props.parentData({name: state.name, price: state.price});
      
    }
    
  }

  return(
   <div>
     <p className="h5 mb-5">選択して入力</p>
     {/*...飲み物selectbox...*/}

     <form className="form-inline bg-light" onSubmit={sendData} >
       <label className="mr-3 font-weight-bold pt-4 pb-4">飲物:</label>
       <select className="form-control mr-3 w-50" onChange={addItem}   >
         <option></option>
         {drinks.map((value,i)=>(
           <option key={'drink'+i} value={value.name + ',' + value.price}>{value.name}</option>
         ))}
       </select>
       <input type="submit" value="追加" className="btn btn-primary" />
     </form>
   </div>
  );
}

export default connect((state)=>state)(Drower2);