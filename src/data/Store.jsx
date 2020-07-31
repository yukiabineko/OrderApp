import { createStore } from "redux";



const init_data = {
  data:[
    {name: 'コーヒー',price: '350', category: '飲み物' },
    {name: 'トースト',price: '250', category: '軽食' },
    {name: '紅茶',price: '300', category: '飲み物' },
    {name: 'チーズケーキ',price: '450', category: '軽食' },
    {name: 'ミルク',price: '300', category: '飲み物' },

  ],
  message: 'おはようございます。',
  mode: 'find',
  fdata:[
    {name: 'コーヒー',price: '350', category: '飲み物' },
    {name: 'トースト',price: '250', category: '軽食' },
    {name: '紅茶',price: '300', category: '飲み物' },
    {name: 'チーズケーキ',price: '450', category: '軽食' },
    {name: 'ミルク',price: '300', category: '飲み物' },

  ],
}

export const foodReducer = (state = init_data, action)=>{
  switch (action.type) {
    case 'ADD':
      return addReducer(state, action);
    case 'DELETE':
      return deleteReducer(state, action);
    case 'EDIT':
      return editReducer(state, action);
    case 'FIND':
       return findReducer(state, action);
    case 'EXCEL':
       return excelReducer(state, action);
    case 'PAGE':
    return pageReducer(state, action);
    default:
      return state;
  }
}

/*追加*/

const addReducer = (state, action)=>{
  let data = {
    name: action.name,
    price: action.price,
    category: action.category
  }
  let newData = state.data.slice();
  newData.push(data);
  return{
    data: newData,
    message: '追加しました。',
    mode: 'default',
    fdata: []
  }
}

/*削除*/

const deleteReducer = (state, action)=>{
  let newData = state.data.slice();
  newData.splice(action.index, 1);
  return{
    data: newData,
    message: '削除しました。',
    mode: 'default',
    fdata: []
  }
}

/*編集*/

const editReducer = (state, action)=>{
  let editData = state.data.slice();
  let i = action.id;
  editData[i].name = action.name;
  editData[i].price = action.price;
  editData[i].category = action.category
  return{
    data: editData,
    message: '編集しました。',
    mode: 'default',
    fdata: []
  }
}
/*検索*/

const findReducer =(state, action)=>{
  let data = state.data.slice();
  let fdata =[];
  switch (action.id) {
    case '1':
      data.forEach((value)=>{
        if(value.price === action.param){
          fdata.push(value);
        }
      });
    break;
    case '2':
      data.forEach((value)=>{
        if(value.category === action.param){
          fdata.push(value);
        }
      });
    break;
    case '3':
      data.forEach((value)=>{
        if(value.name.indexOf(action.param)>=0){
          fdata.push(value);
        }
      });
    break;
  
    default:
      break;
  }
  
  return{
    data: state.data,
    message: '検索しました。',
    mode: 'find',
    fdata: fdata,
  }
}
/*excelインポート*/

const excelReducer =(state, action)=>{
  let newdata = state.data.slice();
  let sheetKey = Object.keys(action.array);
  
  for(let k =0; k<sheetKey.length; k++){
    let arr = action.array[sheetKey[k]];
    for(let i=0; i<arr.length; i++){
      let keys = Object.keys(arr[0]); //配列内キー
      //３要素が記入されたレコードのみ登録
      if(Object.keys(arr[i]).length === 3) newdata.push({name: arr[i][keys[0]], price: arr[i][keys[1]], category: arr[i][keys[2]]});
    }
  }
  
  return{
    data: newdata,
    message: 'Excelインポートしました。',
    mode: 'default',
    fdata: [],
  }
}

/*ページネーション*/

const pageReducer =(state, action)=>{
  let newData = state.data.slice();
  if(action.num == 1){
    newData = newData.slice(0,5);
   }
   else{
    newData = newData.slice((action.num-1)*5, action.num*5);
   }
   return{
    data: state.data,
    message: '',
    mode: 'page',
    fdata: newData,
  }

}

/*********************************************************************************************************************** */
/*export 追加*/

export  const addmemo =(nm, pr, ct)=>{
  return{
    type: 'ADD',
    name: nm,
    price: pr,
    category: ct
  }
}

/*export 削除*/

export  const deletememo =(num)=>{
  return{
    type: 'DELETE',
    index: num
  }
}
/*export 編集*/

export  const editmemo =(i, nm, pr, ct)=>{
  return{
    type: 'EDIT',
    id: i,
    name: nm,
    price: pr,
    category: ct
  }
}
/*export 検索価格*/

export  const searchmemo =(data,categoryId)=>{
  return{
    type: 'FIND',
    id: categoryId,
    param: data
  }
}
/*export excel データ*/

export  const xlsmemo =(array)=>{
  return{
    type: 'EXCEL',
    array: array
  }
}
/*export pagination データ*/

export  const pagememo =(num, first, last)=>{
  
  return{
    type: 'PAGE',
    num: num,
    first: first,
    last: last
  }
}



export default createStore(foodReducer);