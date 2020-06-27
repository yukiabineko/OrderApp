import React from 'react';
import './Order.css';
import { connect } from 'react-redux';
import { foodData } from '../data/Search';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHamburger } from '@fortawesome/free-solid-svg-icons'

const Drower = (props)=>{
  const[state, setState] = useState({
    name: '',
    price: '',
    category:  ''
  })
  const foods = foodData(props.data);
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
   <div className="drower-select">
    
     <div className="drower-select-item">
        <p className="h5 mb-5">選択して入力</p>

        {/*...軽食selectbox...*/}

        <form className="form-inline bg-light form-1" onSubmit={sendData}>
          <label className="mr-3 font-weight-bold pt-4 pb-4">
            <FontAwesomeIcon icon={faHamburger}className="mr-1" size="lg"/>
            軽食:&nbsp;
          </label>
          <select className="form-control mr-3 w-50" onChange={addItem} >
            <option></option>
            {foods.map((value,i)=>(
              <option key={'food'+i}  value={value.name + ',' + value.price + ',' + value.category}>{value.name}</option>
            ))}
          </select>
          <input type="submit" value="追加" className="btn btn-primary" />
        </form>
        </div>
     
   </div>
  );
}

export default connect((state)=>state)(Drower);