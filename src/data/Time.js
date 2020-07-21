export const  setDay = ()=>{
    const nowDate = new Date();
    const month = nowDate.getMonth() + 1;
    const day = nowDate.getDate();
    const formatDay = month+"/"+day;
    return formatDay;
} 
export const dateObjectCheck = ()=>{
    let today = setDay();
    let data = JSON.parse(localStorage.getItem('dates'));
    if(!data){
      let obj = {};
      obj[setDay()] = {};
      obj[setDay()].uriage = 0;
      obj[setDay()].number = 0;
      obj[setDay()].created = new Date();
      localStorage.setItem('dates',JSON.stringify(obj));
    }
    /*else{
      //当日データない場合作成
      if(!data[today]){
        data[today] = {};
        data[today].uriage = 0;
        data[today].number = 0;
        data[today].created = new Date();
        localStorage.setItem('dates',JSON.stringify(data));
      }
    }*/
}

export const showTodayAccounting =()=>{
  const today = setDay();
  const strage = JSON.parse(localStorage.getItem ('dates'));
  if(strage[today]){
    return strage[today]
  }
  else{
    return 0;
  }
}