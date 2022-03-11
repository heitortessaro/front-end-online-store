import React, { Component } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import { getCategories } from './services/api';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
    };

    // this.teste = this.teste.bind(this);
    // this.categoriesList = this.categoriesList.bind(this);
  }

  componentDidMount() {
    console.log('danny');
    this.categoriesList();
  }

  categoriesList = async () => {
    const categoriesRequest = await getCategories();
    this.setState({ categories: categoriesRequest });
    console.log(categoriesRequest);
  }

  // async teste() {
  //   const categories = await getCategories();
  //   console.log(categories);
  //   const productus = await getProductsFromCategoryAndQuery('MLB1403');
  //   console.log(productus);
  // }

  render() {
    // this.teste();
    // this.categoriesList();
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
