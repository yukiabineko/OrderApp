import React from 'react';
import './Order.css';
import { connect } from 'react-redux';
import Drower from './Drower';


const Main = ()=>{
  return(
   <div　className="mt-5">
     <div className="text-center text-dark h1 font-weight-bold mb-5">オーダー詳細</div>

     <input type="checkbox" id="ordercheck" />
     <label for="ordercheck" className="text-primary h3" id="oderOpen">㊉New</label>
     <label for="ordercheck" className="text-primary h3" id="orderBack"></label>
     <div id="orderArea"><Drower /></div>
     <div id="orderModal"></div>

     <div className="row">
       <div className="col-md-7 bg-light p-5"></div>
       {/*.....*/}
       <div className="col-md-5 bg-info p-5"></div>
     </div>
   </div>
  );
}

export default connect()(Main);