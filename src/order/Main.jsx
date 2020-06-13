import React from 'react';
import './Order.css';
import { connect } from 'react-redux';
import Drower from './Drower';
import { useState } from 'react';


const Main = ()=>{
  const[state, setState] = useState({
    data: [],
    items: []
  });
  const addData = (data)=>{
    let sendData = state.data.slice();
    sendData.push({name: data.name, price: data.price});
    setState({data: sendData, item: state.items});
  }
  return(
   <div　className="mt-5">
     <div className="text-center text-dark h1 font-weight-bold mb-5">オーダー詳細</div>

     <input type="checkbox" id="ordercheck" />
     <label for="ordercheck" className="text-primary h3" id="oderOpen">㊉New</label>
     <label for="ordercheck" className="text-primary h3" id="orderBack"></label>
     <div id="orderArea"><Drower parentData={addData} /></div>
     <div id="orderModal">
       <div className="text-center h4 font-weight-bold mt-2 mb-2">[商品オーダーパネル]</div>
       <div className="border-top mb-3"></div>
       <div className="row">
         <div className="col-md-10 offset-1 table_area">
            <table className="table table-bordered">
            <thead>
              <tr>
                <th className="bg-primary text-white font-weight-bold w-75">商品名</th>
                <th className="bg-primary text-white font-weight-bold"></th>
              </tr>
            </thead>
            <tbody>
              {state.data.map((value)=>(
                <tr>
                <td className="font-weight-bold bg-white"> 
                  <h5>{value.name}</h5>
                  <div className="border-top border-primary mb-2"></div>
                  <h6>価格:{value.price}<span className="text-danger">円</span></h6>
                </td>
                <td className="font-weight-bold bg-white"><button className="btn btn-danger btn-block">削除</button></td>
              </tr>
              ))}
            </tbody>
            </table>
         </div>
       </div>
       <div className="text-center">
         <button className="btn btn-primary">確定</button>
       </div>
     </div>


     <div className="row">
       <div className="col-md-7 bg-light p-5"></div>
       {/*.....*/}
       <div className="col-md-5 bg-info p-5"></div>
     </div>
   </div>
  );
}

export default connect()(Main);