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
    default:
      return state;
  }
}
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
export  const addmemo =(nm, pr, ct)=>{
  return{
    type: 'ADD',
    name: nm,
    price: pr,
    category: ct
  }
}
export  const deletememo =(num)=>{
  return{
    type: 'DELETE',
    index: num
  }
}
export default createStore(foodReducer);