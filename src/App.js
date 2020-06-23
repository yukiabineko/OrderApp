import React from 'react';
import './App.css';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ItemMain from './item/main';
import OrderMain from './order/Main';
import AcoountingMain from './accounting/Main';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faShoppingBag, faFileAlt, faListAlt } from '@fortawesome/free-solid-svg-icons'



const App = ()=>{
  return(
   <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-light bg-dark font-weight-bold fixed-top mb-5">
        <a className="navbar-brand mr-3 text-white"> <span className="text-white mr-1"><FontAwesomeIcon icon={faCoffee} size="lg"/></span> オーダーアプリ</a>
        <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link to="/" className="font-weight-bold mr-3 text-warning">
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
      </nav>
      <br/><p></p>
      <Route exact path="/" component={OrderMain} />
      <Route exact path="/item" component={ItemMain} />
      <Route exact path="/accounting" component={AcoountingMain} />
   </BrowserRouter>
  );
}

export default connect()(App);
