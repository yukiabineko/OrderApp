import React from 'react';
import './Order.css';
import { setDay, dateObjectCheck, showTodayAccounting} from '../data/Time';
import { connect } from 'react-redux';
import Drower from './Drower';
import { useState } from 'react';
import Wait from './Wait';
import Drower2 from './Drower2';
import Accounting from './Accounting';
import DrinkButton from './DrinkButton';
import FoodButton from './FoodButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus, faDollarSign, faFileSignature, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import PayoffArea from './PayoffArea';
import ChangeMoney from './ChangeMoney';
import AreaAdd from './AreaAdd';

var itemArray =[];  　　　　//選択された時に追加する配列
var globalItems = [];　　　//上の配列を追加する配列
var modalViewPrice = 0    //モーダル内合計金額
var accountingPrice = 0;  //オーダー金額

const Main = ()=>{
  let today = setDay();
  dateObjectCheck ();
  let keyNO = 0;
    
  let saleObject = showTodayAccounting().uriage;
  let dateItem = JSON.parse(localStorage.getItem('orders'));               //保存データ
  let itemObject = dateItem ? dateItem[today] : []
  if(dateItem && (today === Object.keys(dateItem)[0])){
    
    globalItems = itemObject;
   
    if(accountingPrice ===0 && globalItems.length>0){
      globalItems[0].forEach((value)=>{
        accountingPrice += Number(value.price);
      });
    }
    
  }
  else if(dateItem && !(today === Object.keys(dateItem)[0])){
    dateItem = [];
    localStorage.removeItem('orders');
    globalItems.splice();
    document.location.reload();

  }
  
  

  const[state, setState] = useState({
    data: [],                                          //追加中のオーダーリスト
    items: itemObject,                                 //オーダー待ちリスト
    waitNO: 0,                                         //オーダー待ちNO
    changeMoney: 0,                                    //お釣り
    todaySale: saleObject ? Number(saleObject) : 0,    //本日売上げ
    itemPoint: 0,                                      //買い上げ点数
    right: true,                                       //右エリア
    thisItemAdd: false                                 //会計エリアオーダー追加フラグ
  
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
        right: state.right,
        thisItemAdd: state.thisItemAdd
      });
    modalViewPrice += Number(data.price);  //モーダル表示価格

  }
  //モーダルのsubmitボタン押した際オーダー待ち追加の処理

  const AddOrder = ()=>{
    globalItems.push(itemArray);　//複数のオーダー格納
    itemArray = [];　　　　　　　　　//個々のオーダー初期化
    let saveData = {};            //記録用オブジェクト
    saveData[today] = [];
    let stateItems = state.items.slice();
    stateItems.splice(0);                //更新するためステート空にする。

    globalItems.forEach((value)=>{　　　//複数オーダー配列ステート格納
      stateItems.push(value);
      saveData[today].push(value);
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
      right: state.right,
      thisItemAdd: state.thisItemAdd
    });
    localStorage.setItem('orders', JSON.stringify(saveData));            //当日オーダー状況保存
    
  
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
       right: state.right,
       thisItemAdd: state.thisItemAdd
      })
      
  }
  //オーダー待ちエリア個別削除処理

  const sendWaitOderDelete = (i)=>{
    let result = window.confirm('このオーダーを削除しますか？');
    if(result){
      let stateItems = state.items.slice();
      let localData = JSON.parse(localStorage.getItem('orders'));
      let newData = localData[setDay()];
      newData.splice(i,1);
      localStorage.setItem('orders',JSON.stringify(localData));
      
      stateItems.splice(i, 1);
      setState({
        data: state.data, 
        items: stateItems, 
        waitNO: 0,       //一度最初のオーダーに戻す。
        todaySale: state.todaySale,
        itemPoint: state.itemPoint,
        right: state.right,
        thisItemAdd: state.thisItemAdd
      });
      globalItems.splice(i, 1);
      totalAccounting(0);  //会計エリア合計
      
    }
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
      right: state.right,
      thisItemAdd: state.thisItemAdd
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
      right: state.right,
      thisItemAdd: state.thisItemAdd
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
      right: state.right,
      thisItemAdd: state.thisItemAdd
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

    //ローカルデータも削除
    let localDatas = JSON.parse(localStorage.getItem('orders'))[setDay()];
    localDatas.splice(state.waitNO,1);
    
    //ローカルデータ更新
  　let obj = {}
    obj[setDay()] = localDatas;
    localStorage.setItem('orders', JSON.stringify(obj));

  
    
   newitems.splice(state.waitNO, 1);
   

    setState({      
      data: state.data,
      items: newitems,
      waitNO: 0,                           //一旦最初の要素に戻す。
      changeMoney: state.changeMoney,                    
      todaySale: price,
      itemPoint: itemPoint,
      right: state.right,
      thisItemAdd: state.thisItemAdd      
    });
    totalAccounting(0);                     //精算エリアの合計を要素１のtotalに      
  }
  const rightAria = (check)=>{
  
    setState({
      data: state.data,
      items: state.items,
      waitNO: state.waitNO,                     //一旦最初の要素に戻す。
      changeMoney: state.changeMoney,                    
      todaySale: state.todaySale,
      itemPoint: state.itemPoint,
      right: check,
      thisItemAdd: state.thisItemAdd
    })
  }
  //確定したオーダーリストのアイテム削除(各アイテムの個別ボタンにより)
  const deleteAccountingItem =(number)=>{
    let thisData = state.items[state.waitNO].slice();
    let price = thisData[number].price;
    accountingPrice-=price;
    thisData.splice(number, 1);
    let stateItems = state.items.slice();
    let thiswaitNo = state.waitNO;
    if(thisData.length >0){         //空ではない場合場合リスト(items)から該当配列更新
      stateItems[state.waitNO] = thisData;
    }
    else{                             //空になった場合大元のリスト(items)から該当配列削除
      stateItems.splice(state.waitNO,1);
      thiswaitNo =0;
      accountingPrice = 0;　　　　      //当該配列のデータがなくなったため要素０に戻す。
      if(stateItems.length>0){　　　　　//items最初の要素のプライスを合計する。
        let firstItems = stateItems[0];
        for(let i=0; i<firstItems.length; i++){
          accountingPrice += Number(firstItems[i].price);
        }
      }
    }
    setState({
      data: state.data,
      items: stateItems,
      waitNO: thiswaitNo,                
      changeMoney: state.changeMoney,                    
      todaySale: state.todaySale,
      itemPoint: state.itemPoint,
      right: state.right,
      thisItemAdd: state.thisItemAdd
    })
    let saveData = {};            //記録用オブジェクト
    saveData[today] = [];
    stateItems.forEach((value)=>{
      saveData[today].push(value);
    })   
    localStorage.setItem('orders', JSON.stringify(saveData));            //当日オーダー状況保存
  
  }
  //オーダーエリアに追加
  const orderAreaAdd =(obj)=>{
  
    let thisData = state.items[state.waitNO].slice();
    accountingPrice += Number(obj["price"]);
    
    //該当オーダーに追加
    thisData.push({
      name: obj["name"],
      price: obj["price"],
      category: obj["category"],
      date: new Date()
    });
    let stateItems = state.items.slice();
    stateItems[state.waitNO] = thisData;　　　//オーダー全体に反映
    alert(JSON.stringify(stateItems));

    //ステート更新
    setState({
      data: state.data,
      items: stateItems,
      waitNO: state.waitNO,                
      changeMoney: state.changeMoney,                    
      todaySale: state.todaySale,
      itemPoint: state.itemPoint,
      right: state.right,
      thisItemAdd: state.thisItemAdd
    })


    let saveData = {};            //記録用オブジェクト
    saveData[today] = [];
    stateItems.forEach((value)=>{
      saveData[today].push(value);
    })   
    localStorage.setItem('orders', JSON.stringify(saveData));            //当日オーダー状況
   
  }
  /******************************************* JSX ************************************************************************************ */
  return(
   <div　className="mt-5">
     <div className="text-right text-white uriage">
       <span className="bg-dark p-2 rounded-pill font-weight-bold">
         <FontAwesomeIcon icon={faFileSignature} size="lg" />
           売上げ： 
           <span className="text-warning span1">
             {state.todaySale}
             <label className="text-white">円</label>
           </span>
      </span>
    </div>
     <div className="text-center text-dark h4 font-weight-bold mb-1 mt-1 mb-5 drower-title">オーダー詳細</div>
    
     <input type="checkbox" id="ordercheck" />&nbsp;
     <label htmlFor="ordercheck" className="h5 ml-4" id="oderOpen">
       <FontAwesomeIcon icon={faCartPlus} size="2x" /> 新規オーダー
     </label>
     <label htmlFor="ordercheck" className="text-primary h3" id="orderBack"></label>
     <label className="text-primary h3" id="orderBack2"></label>
     <div className="row order-row">
        <div className="left"> 合計金額:</div>
        <div className="right bg-dark text-warning h3 font-weight-bold text-right rounded">{accountingPrice}<span className="font-weight-bold text-white">円</span></div>
     </div>

     {/*. ドロワーのエリアView..*/}
     <div id="orderArea">
     <div className="font-weight-bold text-center font-weight-bold"><h2 className="order-title">オーダー入力</h2></div>
     <div className="border border-top mb-1"></div>
     <div className="data-input">
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
    </div>
    <button  className="panel-closeButton-phone" onClick={drowerClose}>
      <FontAwesomeIcon icon={faTimesCircle} size="2x"/><br/>閉じる
    </button>
     <div id="orderModal" className="pb-5">
        <div className="text-center h4 font-weight-bold mt-2 mb-2">
          [商品オーダーパネル]
        </div>
        <div className="border-top mb-3"></div>
        {state.data.length === 0 ?
         '' 
         : 
         <div className="mb-3 round font-weight-bold">
          <span className="bg-dark text-white p-2 rounded-left ml-2"><FontAwesomeIcon icon={faDollarSign} size="lg" />合計金額:</span>
          <span className="text-warning bg-dark p-2 rounded-right">{modalViewPrice}円</span>
         </div>
        }
        
       <div className="row">
        
           {state.data.length === 0 ? 
            <div className="col-md-10 offset-1 table_area-empty mb-3">
              <div className="text-center text-primary h4 font-weight-bold no_order">まだオーダーがありません。</div> 
              
             </div>

             :

            <div className="col-md-10 offset-1 table_area mb-3">
              <table className="table table-bordered itemtable3">
                  <thead>
                    <tr>
                      <th className="bg-primary text-white font-weight-bold w-75">商品名</th>
                      <th className="bg-primary text-white font-weight-bold"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {state.data.map((value,i)=>(
                      <tr key={i}>
                      <td className="font-weight-bold bg-white"> 
                        <label>{value.name}<span className="text-danger">価格:{value.price}</span>円</label>
                      </td>
                      <td className="font-weight-bold bg-white">
                        <button className="btn btn-danger" onClick={()=>modalOrderDelete(i)}>削除</button>
                      </td>
                    </tr>
                    ))}
                  </tbody>
              </table>
           </div>
           }
        
       </div>
       {state.data.length === 0 ? <div></div> : <div className="text-center h-20 overflow-auto">
             <button className="btn btn-primary w-25 order-add-button" onClick={AddOrder}>確定</button>
             
           </div>
              
           }
          <button  className="panel-closeButton" onClick={drowerClose}>
             <FontAwesomeIcon icon={faTimesCircle} size="2x"/><br/>閉じる
          </button>
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
     {/**アイテム追加アイテム */}
     <div id="addModal">
        <AreaAdd orderNo={state.waitNO} parentThisOrderAdd={orderAreaAdd} />
    </div>


     {/*** メインエリア ****/}
     {state.right === true ? 
        <div className="row main-area">
        <div className="col-md-7 pt-2 ml-5 Main-Accounting mt-4 border-top">
          <Accounting 
             key={"ac"+ keyNO++}
             viewData={state.items} 
             waitno={state.waitNO}
             totalPrice={accountingPrice}
             parentRight={rightAria}
             checkStatus={state.right}
             parentDeleteItem={deleteAccountingItem}
          /></div>
        {/*.....*/}
        
        <div className="col-md-4 bg-light border-left pt-2 Main-wait mt-4 border-top">
          <Wait 
            key={"wt"+ keyNO++}
            orderData={state.items} 
            sendParentDelete={sendWaitOderDelete}
            sendParentAccounting={sendAccounting}>
         </Wait>
        </div>
      </div>
      //チェックしてる
        
        : 

     //チェックしてない
    <div className="row mt-5 ">
      <div className="col-md-10 offset-1 no-check-accounthing Main-Accounting  border-top">
      <Accounting 
             key={"ac2"+ keyNO++}
             viewData={state.items} 
             waitno={state.waitNO}
             totalPrice={accountingPrice}
             parentRight={rightAria}
             checkStatus={state.right}
             parentDeleteItem={deleteAccountingItem}
          /></div>
      </div>
    }
     
   </div>
  );
}

export default connect()(Main);