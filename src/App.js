import React, { Component } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import { getCategories, getProductsFromCategoryAndQuery } from './services/api';

class App extends Component {
  constructor(props) {
    super(props);
    this.teste = this.teste.bind(this);
  }

  async teste() {
    const categories = await getCategories();
    console.log(categories);
    const productus = await getProductsFromCategoryAndQuery('MLB1403');
    console.log(productus);
  }

  render() {
    this.teste();
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Home } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
