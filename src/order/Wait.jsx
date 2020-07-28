import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboardList, faHamburger, faCoffee } from '@fortawesome/free-solid-svg-icons'

const Wait = (props)=>{

  //オーダー待ちアイテムの削除
  const waitOrderDelete = (i)=>{
      props.sendParentDelete(i);
  }
  //オーダー待ちを会計エリアに送信
  const accountingNoSend = (i)=>{
     props.sendParentAccounting(i);
  }
  return(
    <div className="mt-1">
      <h3 className="text-center text-success font-weight-bold mt-4 mb-4">
        <FontAwesomeIcon icon={faClipboardList} /> 会計待ち一覧
      </h3>
      <div className="wait_area">
      {props.orderData.length === 0 ?
       
       <div className="bg-secondary text-center text-white h5 font-weight-bold p-5 ml-1 mt-3">オーダーなし</div>
       : 
       props.orderData.map((val,i)=>(
         <div key={i}> 
          <span>
            <button className="btn btn-success mr-2" onClick={()=>accountingNoSend(i)}>会計切替</button>
            <label className="text-dark font-weight-bold mr-2">{'注文NO:' + (i+1)}</label>
          </span>
          <table className="table table-bordered mb-2 mt-1">
            <thead>
              <tr>
                <td className="bg-primary text-white text-center align-middle">分類</td>
                <td className="bg-primary text-white text-center w-75 align-middle">名前</td>
              </tr>
            </thead>
            <tbody>
              {val.map((value, i)=>(
                <tr key={i}>
                  {value.category === '軽食'? 
                   <td className="text-center bg-white font-weight-bold">
                     <FontAwesomeIcon icon={faHamburger} size="2x"/><p></p>
                     <label>{value.category}</label>
                   </td>
                  : 
                  <td className="text-center bg-white font-weight-bold">
                     <FontAwesomeIcon icon={faCoffee} size="2x"/><p></p>
                     <label>{value.category}</label>
                  </td>
                  }
                
                  <td className="text-center bg-white font-weight-bold align-middle">
                    <h4 className="font-weight-bold">{value.name}</h4>
                    <p className="text-primary">価格: <span className="text-danger">{value.price}</span>円</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-light">
            <label className="text-dark font-weight-bold mr-2">{'受付時間:' + new Date(val[0].date).getHours() + '時' + new Date(val[0].date).getMinutes() +'分' }</label>
            <button className="btn btn-danger mb-2" onClick={()=>waitOrderDelete(i)}>削除する</button>
          </div>
          <div className="border-top  pt-4 pb-4"></div>
         </div>
       ))
      }
    </div>
  </div>
      
  );
}
export default connect()(Wait);