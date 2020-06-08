import React from 'react';
import './App.css';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ItemMain from './item/main';
import { connect } from 'react-redux';

const App = ()=>{
  return(
   <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-light bg-warning font-weight-bold">
        <a className="navbar-brand" href="#">オーダーアプリ</a>
        <ul className="navbar-nav mr-auto">
          <li className="nav-item"><Link to="/" className="font-weight-bold">商品登録</Link></li>
        </ul>
      </nav>
      <Route exact path="/" component={ItemMain} />
   </BrowserRouter>
  );
}

export default connect()(App);
