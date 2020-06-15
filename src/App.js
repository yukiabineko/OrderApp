import React from 'react';
import './App.css';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ItemMain from './item/main';
import OrderMain from './order/Main';
import { connect } from 'react-redux';

const App = ()=>{
  return(
   <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-light bg-warning font-weight-bold fixed-top mb-5">
        <a className="navbar-brand" href="#">オーダーアプリ</a>
        <ul className="navbar-nav mr-auto">
        <li className="nav-item"><Link to="/" className="font-weight-bold mr-3">オーダー</Link></li>
          <li className="nav-item"><Link to="/item" className="font-weight-bold">商品登録</Link></li>
        </ul>
      </nav>
      <br/><p></p>
      <Route exact path="/" component={OrderMain} />
      <Route exact path="/item" component={ItemMain} />
   </BrowserRouter>
  );
}

export default connect()(App);
