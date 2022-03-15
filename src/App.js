import React, { Component } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import Buy from './pages/Buy';
import Cart from './pages/Cart';
import Home from './pages/Home';
import Product from './pages/Product';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route exact path="/carrinho" component={ Cart } />
          <Route exact path="/produto:id" component={ Product } />
          <Route exact path="/comprar" component={ Buy } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
