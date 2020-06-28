import React, { useRef } from 'react';
import { connect } from 'react-redux';
import './Main.css';
import Item from './Item';
import Item2 from './Item2';




const Menu = (props)=>{
  const childRef = useRef();

  let parentModal = (num)=>{
     childRef.current.openModal();
  }
  let items = props.mode === 'default' ?
   props.data.map((value, i)=>(
     <Item key={value.message} value={value} index={i} parent={(num)=>parentModal(num)} />
     
   ))
   :
   props.fdata.map((value, i)=>(
    <Item key={value.message} value={value} index={i} parent={(num)=>parentModal(num)} />
  ))


  let items2 = props.mode === 'default' ?
   props.data.map((value, i)=>(
     <Item2 key={value.message} value={value} index={i} parent={(num)=>parentModal(num)} />
     
   ))
   :
   props.fdata.map((value, i)=>(
    <Item2 key={value.message} value={value} index={i} parent={(num)=>parentModal(num)} />
  ))
  
  return(
    <div>
      <p>{props.message}</p>
      {props.mode === 'default'? 
        props.data.length === 0 ? 
        <div className="bg-secondary text-light p-5">データがありません。</div>
          : 
          <div>
          {/* .....pc...*/}
          <table className="table table-bordered itemTable list-pc">
            <thead>
              <tr>
                <th className="bg-dark text-white text-center">NO</th>
                <th className="bg-dark text-white text-center">商品名</th>
                <th className="bg-dark text-white text-center">価格</th>
                <th className="bg-dark text-white text-center">カテゴリー</th>
                <th className="bg-dark text-white text-center"></th>
              </tr>
            </thead>
            <tbody>
              {items}
            </tbody>
          </table>
           {/* .....phone...*/}

          <table className="table table-bordered itemTable list-phone">
            <thead>
              <tr>
                <th className="bg-dark text-white text-center">商品名</th>
                <th className="bg-dark text-white text-center">価格</th>
                <th className="bg-dark text-white text-center"></th>
              </tr>
            </thead>
            <tbody>
              {items2}
            </tbody>
          </table>


          </div>
          :
          props.fdata.length === 0 ? 
          <div className="bg-secondary text-light p-5">データがありません。</div>
           : 
        <div>
           {/* .....pc...*/}
          <table className="table table-bordered list-pc">
          <thead>
            <tr>
              <th className="bg-dark text-white text-center">NO</th>
              <th className="bg-dark text-white text-center">商品名</th>
              <th className="bg-dark text-white text-center">価格</th>
              <th className="bg-dark text-white text-center">カテゴリー</th>
              <th className="bg-dark text-white text-center"></th>
            </tr>
          </thead>
          <tbody>
            {items}
          </tbody>
        </table>
          {/* .....phone...*/}

          <table className="table table-bordered itemTable list-phone">
            <thead>
              <tr>
                <th className="bg-dark text-white text-center">商品名</th>
                <th className="bg-dark text-white text-center">価格</th>
                <th className="bg-dark text-white text-center"></th>
              </tr>
            </thead>
            <tbody>
              {items2}
            </tbody>
          </table>
      </div>
      }
    </div>
  );
}
export default connect((state)=>state)(Menu)