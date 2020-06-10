import { createStore } from "redux";



const init_data = {
  data:[{name: 'コーヒー',price: '200', category: '飲み物' }],
  message: 'おはようございます。',
  mode: 'default',
  fdata: []
}

const foodReducer = (state = init_data, action)=>{
  switch (action.type) {
    case 'ADD':
      return addReducer(state, action);
    case 'DELETE':
      return deleteReducer(state, action);
    case 'EDIT':
      return editReducer(state, action);
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
export default createStore(foodReducer);