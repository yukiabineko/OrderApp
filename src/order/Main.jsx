import React from 'react';
import './Order.css';
import { setDay, dateObjectCheck } from '../data/Time';
import { connect } from 'react-redux';
import Drower from './Drower';
import { useState } from 'react';
import Wait from './Wait';
import Drower2 from './Drower2';
import Accounting from './Accounting';
import DrinkButton from './DrinkButton';
import FoodButton from './FoodButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus, faDollarSign, faFileSignature } from '@fortawesome/free-solid-svg-icons'
import PayoffArea from './PayoffArea';
import ChangeMoney from './ChangeMoney';

var itemArray =[];  　　　　//選択された時に追加する配列
var globalItems = [];　　　//上の配列を追加する配列
var modalViewPrice = 0    //モーダル内合計金額
var accountingPrice = 0;  //オーダー金額

const Main = ()=>{
  

  const[state, setState] = useState({
    data: [],   //追加中のオーダーリスト
    items: [],  //オーダー待ちリスト
    waitNO: 0,  //オーダー待ちNO
    changeMoney: 0,  //お釣り
    todaySale: 0,     //本日売上げ
    itemPoint: 0,     //買い上げ点数
    right: true
  
  });
  //ドロワーを閉じる

  const drowerClose = ()=>{
    let drower = document.getElementById('ordercheck');
    drower.checked = false; 
  }
  const addData = (data)=>{    //左のパネルから商品追加
    let sendData = state.data.slice();
    sendData.push({name: data.name, price: data.price, category: data.category, date: new Date()});
    itemArray.push({name: data.name, price: data.price, category: data.category, date: new Date()});
    
    setState(
      {
        data: sendData, 
        items: state.items, 
        waitNO: state.waitNO, 
        changeMoney: state.changeMoney,
        todaySale: state.todaySale,
        right: state.right
      });
    modalViewPrice += Number(data.price);  //モーダル表示価格

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
    setState({
      data: newdata, 
      items: stateItems, 
      waitNO: state.waitNO, 
      changeMoney: state.changeMoney,
      todaySale: state.todaySale,
      itemPoint: state.itemPoint,
      right: state.right
    });
    modalViewPrice = 0;       //モーダルの価格覧リセット

    totalAccounting(0);  //会計エリア合計

    drowerClose(); //ドロワーを閉じる
    
  }
  //モーダル内の各削除ボタン押した際処理削除処理

  const modalOrderDelete = (i)=>{
     modalViewPrice = 0;
     let statedata = state.data.slice();
     statedata.splice(i, 1);
     itemArray.splice(i, 1);
     statedata.forEach((data)=>{
        modalViewPrice += Number(data.price);
     });
     setState({
       data :statedata, 
       items: state.items, 
       waitNO: state.waitNO, 
       changeMoney: state.changeMoney,
       todaySale: state.todaySale,
       itemPoint: state.itemPoint,
       right: state.right
      })
  }
  //オーダー待ちエリア個別削除処理

  const sendWaitOderDelete = (i)=>{
    let stateItems = state.items.slice();
    stateItems.splice(i, 1);
    setState({
      data: state.data, 
      items: stateItems, 
      waitNO: 0,       //一度最初のオーダーに戻す。
      todaySale: state.todaySale,
      itemPoint: state.itemPoint,
      right: state.right
    });
    globalItems.splice(i, 1);
    totalAccounting(0);  //会計エリア合計
  }
  ////会計エリア合計処理

  const totalAccounting = (i)=>{
    
    accountingPrice = 0;
    if(globalItems[i]){
      globalItems[i].forEach((value)=>{
        accountingPrice += Number(value.price);
      });
    }
  }
  //会計エリアのオーダー表示処理

  const sendAccounting = (i)=>{
    setState({
      data: state.data, 
      items: state.items, 
      waitNO: i,changeMoney: state.changeMoney,
      todaySale: state.todaySale,
      itemPoint: state.itemPoint,
      right: state.right
    });
    totalAccounting(i);  //会計エリア合計
   
  }
  // 会計処理モーダルからのsubmit

  const AccountingSubmit = (change) =>{
   setState({    //お釣りのセッティング
      data: state.data,
      items: state.items,
      waitNO: state.waitNO,
      changeMoney: change,
      todaySale: state.todaySale,
      itemPoint: state.itemPoint,
      right: state.right
   })  
  }
   //お釣りのリセット

  const resetChange = ()=>{
    setState({
      data: state.data,
      items: state.items,
      waitNO: state.waitNO,
      changeMoney: 0,
      todaySale: state.todaySale,
      itemPoint: state.itemPoint,
      right: state.right
    });

  }
  //会計終了時当該データ削除
 
  const deletOrderData = ()=>{
    let newitems = state.items.slice();

    let itemPoint = state.items[state.waitNO].length; //当該オーダー売上数

    let price = state.todaySale;
    price += accountingPrice                //当日売り上げ加算
    

    globalItems.splice(state.waitNO, 1);    //グローバル合計も変更


    let today = setDay();
    dateObjectCheck ();
    let data = JSON.parse(localStorage.getItem('dates').slice());
      
    if(data[today]){
      data[today].uriage += accountingPrice;
      data[today].number += itemPoint;
    }
    //当日データない場合作成

    else{               
       data[today] = {uriage: price, number: itemPoint, created: new Date()};
    }
    localStorage.setItem('dates',JSON.stringify(data));
  
    
   newitems.splice(state.waitNO, 1);
   

    setState({      
      data: state.data,
      items: newitems,
      waitNO: 0,                           //一旦最初の要素に戻す。
      changeMoney: state.changeMoney,                    
      todaySale: price,
      itemPoint: itemPoint,
      right: state.right      
    });
    totalAccounting(0);                     //精算エリアの合計を要素１のtotalに      
  }
  const rightAria = (check)=>{
    setState({
      data: state.data,
      items: state.items,
      waitNO: state.waitNO,                     //一旦最初の要素に戻す。
      changeMoney: state.changeMoney,                    
      todaySale: state.price,
      itemPoint: state.itemPoint,
      right: check
    })
  }
  /******************************************* JSX ************************************************************************************ */
  return(
   <div　className="mt-5">
     <div className="text-right text-white uriage">
       <span className="bg-dark p-2 rounded-pill font-weight-bold">
         <FontAwesomeIcon icon={faFileSignature} size="lg" />
           売上げ：
           <span className="text-warning">{state.todaySale}</span>円
      </span>
    </div>
     <div className="text-center text-dark h3 font-weight-bold mb-5">オーダー詳細</div>
     

     <input type="checkbox" id="ordercheck" />&nbsp;
     <label for="ordercheck" className="h5 ml-4" id="oderOpen">
       <FontAwesomeIcon icon={faCartPlus} size="2x" /> 新規オーダー
     </label>
     <label for="ordercheck" className="text-primary h3" id="orderBack"></label>
     <label className="text-primary h3" id="orderBack2"></label>

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
     <div id="orderModal" className="pb-5">
        <div className="text-center h4 font-weight-bold mt-2 mb-2">[商品オーダーパネル]</div>
        <div className="border-top mb-3"></div>
        {state.data.length === 0 ?
         '' 
         : 
         <div className="mb-2 round font-weight-bold">
          <span className="bg-dark text-white p-2 rounded-left ml-2"><FontAwesomeIcon icon={faDollarSign} size="lg" />合計金額:</span>
          <span className="text-warning bg-dark p-2 rounded-right">{modalViewPrice}円</span>
       </div>
        }
        
       <div className="row">
         <div className="col-md-10 offset-1 table_area">
           {state.data.length === 0 ? 
             <div className="text-center text-primary h4 font-weight-bold no_order">まだオーダーがありません。</div> 
             :
            <div>
            
            <table className="table table-bordered itemTable2">
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
       {state.data.length === 0 ? <div></div> : <div className="text-center h-20 overflow-auto">
             <button className="btn btn-primary" onClick={AddOrder}>確定</button>
           </div>   
           }
     </div>
     {/***会計用モーダル */}


     <div id="AcoountingModal">
      <PayoffArea 
      sendModalTotalMoney={accountingPrice} 
      sendAccountingSubmit={AccountingSubmit}
     
      />
     </div>

     {/***お釣り用モーダル */}
     <div id="changeModal">
      <ChangeMoney
       sendChangeMoney={state.changeMoney} //お釣りの子コンポーネント送信
       parentResetCahange={resetChange}    //親コンポーネントお釣りリセット
       parentOderDelete={deletOrderData}
       />
     </div>



     {/*** メインエリア ****/}
     {state.right === true ? 
        <div className="row mt-2">
        <div className="col-md-7 pt-2 ml-5 Main-Accounting">
          <Accounting 
             viewData={state.items} 
             waitno={state.waitNO}
             totalPrice={accountingPrice}
             parentRight={rightAria}
             checkStatus={state.right}
          /></div>
        {/*.....*/}
        
        <div className="col-md-4 bg-light border-left pt-2 Main-wait">
          <Wait 
            orderData={state.items} 
            sendParentDelete={sendWaitOderDelete}
            sendParentAccounting={sendAccounting}>
         </Wait>
        </div>
      </div>
      //チェックしてる
        
        : 

     //チェックしてない
    <div className="row mt-2 ">
      <div className="col-md-10 offset-1 no-check-accounthing Main-wait">
      <Accounting 
             viewData={state.items} 
             waitno={state.waitNO}
             totalPrice={accountingPrice}
             parentRight={rightAria}
             checkStatus={state.right}
          /></div>
      </div>
    }
     
   </div>
  );
}

export default connect()(Main);