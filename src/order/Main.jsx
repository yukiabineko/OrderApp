import React from 'react';
import './Order.css';
import { connect } from 'react-redux';
import Drower from './Drower';
import { useState } from 'react';
import Wait from './Wait';
import Drower2 from './Drower2';
import Accounting from './Accounting';
import DrinkButton from './DrinkButton';
import FoodButton from './FoodButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'

var itemArray =[];  　　　　//選択された時に追加する配列
var globalItems = [];　　　//上の配列を追加する配列


const Main = ()=>{

  const[state, setState] = useState({
    data: [],
    items: [],
    waitNO: 0
   
  });
  //ドロワーを閉じる

  const drowerClose = ()=>{
    let drower = document.getElementById('ordercheck');
    drower.checked = false; 
  }
  const addData = (data)=>{    //左のパネルから商品追加
    let sendData = state.data.slice();
    sendData.push({name: data.name, price: data.price, date: new Date()});
    itemArray.push({name: data.name, price: data.price, date: new Date()});
    
    setState({data: sendData, items: state.items, waitNO: state.waitNO});
   

  }
  //モーダルのsubmitボタン押した際オーダー待ち追加の処理

  const AddOrder = ()=>{
    globalItems.push(itemArray);　//複数のオーダー格納
    itemArray = [];　　　　　　　　　//個々のオーダー初期化

    let stateItems = state.items.slice();
    stateItems.splice(0);                //更新するためステート空にする。

    globalItems.forEach((value)=>{　　　//複数オーダー配列ステート格納
      stateItems.push(value);
    })
    let newdata = state.data.slice();    //モーダル内のデータ管理
    newdata.splice(0);
    setState({data: newdata, items: stateItems, waitNO: state.waitNO});

    drowerClose(); //ドロワーを閉じる
  }
  //モーダル内の各削除ボタン押した際処理削除処理

  const modalOrderDelete = (i)=>{
     let statedata = state.data.slice();
     statedata.splice(i, 1);
     setState({data :statedata, items: state.items, waitNO: state.waitNO})
  }
  //オーダー待ちエリア個別削除処理

  const sendWaitOderDelete = (i)=>{
    let stateItems = state.items.slice();
    stateItems.splice(i, 1);
    setState({data: state.data, items: stateItems, waitNO: 0});
    globalItems.splice(i, 1);
  }
  //会計エリアのオーダー表示処理

  const sendAccounting = (i)=>{
    setState({data: state.data, items: state.items, waitNO: i});
  }
  /******************************************* JSX ************************************************************************************ */
  return(
   <div　className="mt-5">
     <div className="text-center text-dark h1 font-weight-bold mb-5">オーダー詳細</div>

     <input type="checkbox" id="ordercheck" />
     <label for="ordercheck" className="h3" id="oderOpen">
       <FontAwesomeIcon icon={faCartPlus} size="2x" /> 新規オーダー
     </label>
     <label for="ordercheck" className="text-primary h3" id="orderBack"></label>

     {/*. ドロワーのエリアView..*/}
     <div id="orderArea">
       <Drower parentData={addData} />
       <Drower2 parentData={addData} />
       {/*...ドロワーボタン入力エリア...*/}

        <div className="border border-top mb-1"></div>
       
        <p className="h5 mb-5">ボタンで入力</p>
        <div className="row btArea">
          <div className="col-md-6"><DrinkButton sendDrinkData={addData} /></div>
          <div className="col-md-6 border-left"><FoodButton sendFoodData={addData} /></div>
        </div>
    </div>
     <div id="orderModal">
       <div className="text-center h4 font-weight-bold mt-2 mb-2">[商品オーダーパネル]</div>
       <div className="border-top mb-3"></div>
       <div className="row">
         <div className="col-md-10 offset-1 table_area">
           {state.data.length === 0 ? 
             <div className="text-center text-primary h4 font-weight-bold no_order">まだオーダーがありません。</div> 
             :
            <div>
            <table className="table table-bordered">
                <thead>
                  <tr>
                    <th className="bg-primary text-white font-weight-bold w-75">商品名</th>
                    <th className="bg-primary text-white font-weight-bold"></th>
                  </tr>
                </thead>
                <tbody>
                  {state.data.map((value,i)=>(
                    <tr>
                    <td className="font-weight-bold bg-white"> 
                      <h5>{value.name}</h5>
                      <div className="border-top border-primary mb-2"></div>
                      <h6>価格:{value.price}<span className="text-danger">円</span></h6>
                    </td>
                    <td className="font-weight-bold bg-white">
                      <button className="btn btn-danger btn-block" onClick={()=>modalOrderDelete(i)}>削除</button>
                    </td>
                  </tr>
                  ))}
                </tbody>
            </table>
            
          </div>
           }
         </div>
       </div>
       {state.data.length === 0 ? <div></div> : <div className="text-center">
             <button className="btn btn-primary" onClick={AddOrder}>確定</button>
           </div>   
           }
     </div>

     <div className="row mt-2">
       <div className="col-md-7 bg-light p-5">
         <Accounting 
            viewData={state.items} 
            waitno={state.waitNO}
         /></div>
       {/*.....*/}
       <div className="col-md-5 bg-light p-5 border-left">
         <Wait 
           orderData={state.items} 
           sendParentDelete={sendWaitOderDelete}
           sendParentAccounting={sendAccounting}>
        </Wait>
       </div>
     </div>
   </div>
  );
}

export default connect()(Main);