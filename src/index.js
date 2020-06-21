import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { foodReducer } from './data/Store';
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist';
import { createStore } from 'redux';
import { PersistGate } from 'redux-persist/integration/react';

const set_parame ={
  key: 'memo',
  storage: storage,
  blacklist:['message', 'fdata', 'mode'],
  whitelist: ['data']
}
let per = persistReducer(set_parame, foodReducer);
let store = createStore(per);
let pstore = persistStore(store);

ReactDOM.render(
  <PersistGate loading={<p></p>} persistor={pstore}>
    <Provider store={store}>
      <App />
    </Provider>
  </PersistGate>,
  document.getElementById('root')
);
