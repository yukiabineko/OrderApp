export const  setDay = ()=>{
    const nowDate = new Date();
    const year = nowDate.getFullYear();
    const month = nowDate.getMonth() + 1;
    const day = nowDate.getDate();
    const formatDay = year+"/"+month+"/"+day;
    return formatDay;
} 
export const dateObjectCheck = (day)=>{
    let object = localStorage.getItem('dates');
    if(!object){
      localStorage.setItem('dates',JSON.stringify({}));
    }
   
}