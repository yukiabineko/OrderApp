import React, { useState } from 'react';
import { connect } from 'react-redux';
import { pagememo } from '../data/Store';
import { withRouter } from 'react-router';

const style1={
  background: "#4689FF",
  color: '#fff'
}
const style2={
  background: "white",
  color:"#000"
}

/***************************************************************************************************************** */

const Pagination = (props)=>{
  const baseData = props.data;                                                               /*ベースのreduxデータ*/
   
  const[state, setState] = useState({                                                        /*ステート設定*/
    data: [baseData[0], baseData[1],baseData[2], baseData[3],baseData[4]],
    first: props.firstpage,                                                                  /*ページ起点　*/
    last: props.lastpage,                                                                     /*ページ終点　*/
    sendNum: 0
  });

  //全ページ数
  let buttonNumbers = [];

  for(let i=0; i<baseData.length; i++){   //全データから５の倍数で区切り
    if(i%5 === 0){
      buttonNumbers.push(i/5+1);
    }
  }

  //振り分けページ数
  let viewButton = [];
  for(let i=state.first; i<state.last; i++){
    if(buttonNumbers[i] != null){
      viewButton.push(buttonNumbers[i]);
    }
  }
  
/*********************関数***************************************************************************** */
const changes =(num)=>{
  for(let i=0; i<viewButton.length; i++){
   
    let bt = document.getElementById("bt"+viewButton[i]);
    if(viewButton[i] === num){
      bt.style.background="#4689FF";
      bt.style.color ="#fff";
    }
    else{
      bt.style.background="white";
      bt.style.color ="#000";
    }
  }
 
  let newData =state.data.slice();
  newData.splice(0);
  for(let i=0; i<baseData.length; i++){
    newData.push(baseData[i]);
  }
  
   if(num === 1){
    newData = newData.slice(0,4);
   }
   else{
    newData = newData.slice((num-1)*5,num*5);
   }
   return newData;
}

//ボタンクリック

const doClick =(num)=>{
  let action = pagememo(num, state.first, state.last, num);
  
  props.dispatch(action);
  let newData = changes(num);
  props.parentSend(num);
   
   setState({
     data:newData,
     first: state.first,
     last: state.last,
     sendNum: num
   })
  
}
const doNext =()=>{
  let f = state.last;
  let l = f+5
  
  setState({
    data: state.data,
    first: f,
    last: l
  })
}
const doPrev =()=>{
  let l = state.first;
  let f = l-5;
  
  let newData = changes(f+1);
  setState({
    data: newData,
    first: f,
    last: l
  })

}
/*****************************************JSX********************************************************** */
  return(
    <div className="paginations">
      <label>ページ</label>
        
        {viewButton[0] >5?
          <button style={style2} className="btn bt border mr-2" onClick={doPrev}>前</button>
        : 
        ''}
        {viewButton.map((num)=>(
          num == null? 
          '' 
           : 
          num ===1 ?
          <button id={"bt"+num} key={num} style={style1} className="btn bt border mr-2" onClick={()=>doClick(num)}>{num}</button>
          :
          <button id={"bt"+num} key={num} style={style2} className="btn bt border mr-2" onClick={()=>doClick(num)}>{num}</button>
          
        ))}
        {buttonNumbers.length >5 && state.last<buttonNumbers.length?
        <button style={style2} className="btn bt border mr-2" onClick={doNext}>次</button>
        : 
        ''}
    </div>
  );
}
export default  withRouter(connect((state=>state))(Pagination))
