export const  setDay = ()=>{
    const nowDate = new Date();
    const year = nowDate.getFullYear();
    const month = nowDate.getMonth() + 1;
    const day = nowDate.getDate();
    const formatDay = year+"/"+month+"/"+day;
    return formatDay;
} 