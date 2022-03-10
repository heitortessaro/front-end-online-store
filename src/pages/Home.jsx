import React, { Component } from 'react';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';

export default class Home extends Component {
  constructor(props) {
    super(props);
    // this.handleClickSearch = this.handleClickSearch.bind(this);
    this.state = {
      queryInput: '',
    };
  }

  // async handleClickSearch() {

  // }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    console.log(value);
    this.setState({ [name]: value });
  };

  // async teste() {
  //   const categories = await getCategories();
  //   console.log(categories);
  //   const productus = await getProductsFromCategoryAndQuery('MLB1403');
  //   console.log(productus);
  // }

  render() {
    const {
      queryInput,
    } = this.state;
    return (
      <div>
        <section>
          <label htmlFor="query-input" data-testid="home-initial-message">
            <input
              type="text"
              id="query-input"
              name="queryInput"
              testid="query-input"
              value={ queryInput }
              onChange={ this.onInputChange }
            />
          </label>
          <button
            type="button"
            data-testid="query-button"
          >
            Buscar
          </button>
        </section>
        <section className="product-search-result">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </section>
      </div>
    );
  }
}
