

export const foodData = (data)=>{
  let stateData = data.slice();
  let searchData = [];
  stateData.forEach((value)=>{
    if(value.category === '軽食'){
      searchData.push(value);
    }
  });
 return searchData;
}

export const drinkData = (data)=>{
  let stateData = data.slice();
  let searchData = [];
  stateData.forEach((value)=>{
    if(value.category === '飲み物'){
      searchData.push(value);
    }
  });
 return searchData;
}