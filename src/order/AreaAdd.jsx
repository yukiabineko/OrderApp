import React, { useState } from 'react';
import './Order.css';
import { connect } from 'react-redux';
import { foodData,drinkData } from '../data/Search';
import { setDay } from '../data/Time';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const buttonStyle={
  border:'none',
  background: 'none'
}
const table={
  width: '100%',
 
}
const td1={
  width: '75%',
}



const AreaAdd = (props)=>{
  const foods = foodData(props.data);
  const drinks = drinkData(props.data);
  const[state, setState] = useState({
    foodnumber: 0,
    drinknumber:0
  });
  
  const closebutton = ()=>{
    let addModal = document.getElementById('addModal');
    addModal.style.transform ="translatey(-150%)";
    document.getElementById('orderBack2').style.display = "none";
  }
  //stateチェンジ
  const addselectChange = (e)=>{
     switch (e.target.name) {
       case "food":
         setState({
          foodnumber: e.target.value,
          drinknumber: state.drinknumber
         });
         break;
      case "drink":
      setState({
        foodnumber: state.foodnumber,
        drinknumber: e.target.value
      });
      break;

       default:
         break;
     }
     
  }
  //追加処理
  const addorderItem =(e)=>{
   
    let thisfood = foods[state.foodnumber];
    let thisdrink = drinks[state.drinknumber];
    switch (e.target.name) {
      case "food":
        props.parentThisOrderAdd(thisfood);
        closebutton();
        break;
      case "drink":
        props.parentThisOrderAdd(thisdrink);
        closebutton();
      break;

        default:
          break;
      }
  }
  return(
    <div>
      <div className="text-right h2 overflow-hidden">
      <button style={buttonStyle} className="mt-2" onClick={closebutton}>
        <FontAwesomeIcon icon={faTimesCircle}/>&thinsp; 
      </button>
      </div>
      <div className="text-center  h2 overflow-hidden">[商品追加]</div>
      <div className="border-bottom"></div>
      <div className="row mt-4">
        <div className="col-md-10 offset-2">

        {/**軽食選択 */}
        <div className="form-group mb-5">
          <label　className="font-weight-bold">軽食を選択して追加</label>
          <table style={table}>
            <tr>
              <td style={td1} >
                <select name="food" className="form-control" onChange={addselectChange}>
                  {foods.map((value,i)=>(
                    <option key={i} value={i}>{value.name}</option>
                  ))}
                </select>
              </td>
              <td><button name="food" className="btn btn-primary" onClick={addorderItem}>追加</button></td>
            </tr>
          </table>
        </div>

         {/**飲み物選択 */}
         <div className="form-group mt-3">
          <label　className="font-weight-bold">飲物を選択して追加</label>
          <table style={table}>
            <tr>
              <td style={td1} >
                <select name="drink" className="form-control" onChange={addselectChange}>
                  {drinks.map((value,i)=>(
                    <option key={i} value={i}>{value.name}</option>
                  ))}
                </select>
              </td>
              <td><button name="drink" className="btn btn-primary" onClick={addorderItem}>追加</button></td>
            </tr>
          </table>
        </div>
         
        </div>
      </div>
      <div className="text-center mt-5">
          <button className="btn btn-secondary w-25">閉じる</button>
      </div>

    </div>
  );
}
export default connect((state)=>state)(AreaAdd);