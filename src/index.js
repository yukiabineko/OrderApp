import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import dataStore from './data/Store';


ReactDOM.render(
  <Provider store={dataStore}>
    <App />
  </Provider>,
  document.getElementById('root')
);
