import React from 'react';
import './App.css';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import ItemMain from './item/main';
import OrderMain from './order/Main';
import AcoountingMain from './accounting/Main';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faShoppingBag, faFileAlt, faListAlt,faBars } from '@fortawesome/free-solid-svg-icons'

const st ={
  zIndex: '9'
}

const App = ()=>{
  return(
   <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-light bg-dark font-weight-bold fixed-top mb-5" style={st}>
        <a className="navbar-brand mr-3 text-white"> <span className="text-white mr-1"><FontAwesomeIcon icon={faCoffee} size="lg"/></span> オーダーアプリ</a>
        <button className="navbar-toggler text-white" type="button" data-toggle="collapse" data-target="#navbarsExample01" aria-controls="navbarsExample01" aria-expanded="false" aria-label="Toggle navigation">
          <FontAwesomeIcon icon={faBars} />
        </button>
        <div className="collapse navbar-collapse" id="navbarsExample01">
        <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link to="/" className="font-weight-bold mr-3 text-warning" >
            <span className="text-warning mr-1"><FontAwesomeIcon icon={faShoppingBag} size="lg"/></span> オーダー
          </Link></li>
        <li className="nav-item">
          <Link to="/item" className="font-weight-bold text-warning mr-3">
            <span className="text-warning mr-1"><FontAwesomeIcon icon={faFileAlt} size="lg"/></span> 商品登録
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/accounting" className="font-weight-bold text-warning">
            <span className="text-warning mr-1"><FontAwesomeIcon icon={faListAlt} size="lg"/></span> 売上げ確認
          </Link>
        </li>
        </ul>
        </div>
      </nav>
      <br/><p></p>
      <Route exact path="/" component={OrderMain} />
      <Route exact path="/item" component={ItemMain} />
      <Route exact path="/accounting" component={AcoountingMain} />
   </BrowserRouter>
  );
}

export default connect()(App);
