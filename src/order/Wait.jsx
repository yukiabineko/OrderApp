import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboardList } from '@fortawesome/free-solid-svg-icons'

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
    <div className="wait_area mt-1">
      <h3 className="text-center text-success font-weight-bold">
        <FontAwesomeIcon icon={faClipboardList} /> オーダー待ち覧
      </h3>
      {props.orderData.length === 0 ?
       <div className="text-center font-weight-bold h5 mt-5 text-white bg-secondary p-5">オーダーなし</div>
       : 
       props.orderData.map((val,i)=>(
         <div>
          <span>
            <button className="btn btn-success mr-2" onClick={()=>accountingNoSend(i)}>会計する</button>
            <label className="text-dark font-weight-bold mr-2">{'注文NO:' + (i+1)}</label>
          </span>
          <table className="table table-bordered mb-2 mt-1">
            <thead>
              <tr>
                <td className="bg-primary text-white text-center">NO</td>
                <td className="bg-primary text-white text-center">名前</td>
              </tr>
            </thead>
            <tbody>
              {val.map((value)=>(
                <tr>
                  <td className="text-center bg-white font-weight-bold"></td>
                  <td className="text-center bg-white font-weight-bold">{value.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-light">
            <label className="text-dark font-weight-bold mr-2">{'受付時間:' + val[0].date.getHours() + '時' + val[0].date.getMinutes() +'分' }</label>
            <button className="btn btn-danger mb-2" onClick={()=>waitOrderDelete(i)}>削除する</button>
          </div>
          <div className="border-top  pt-4 pb-4"></div>
         </div>
       ))
      }
    </div>
  );
}
export default connect()(Wait);