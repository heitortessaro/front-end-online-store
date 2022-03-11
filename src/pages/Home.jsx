import React, { Component } from 'react';
import ProductCard from '../components/ProductCard';
import { getProductsFromCategoryAndQuery } from '../services/api';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queryInput: '',
      hasSearched: false,
      sarchedProducts: [],
    };
    this.onSearchButtonClick = this.onSearchButtonClick.bind(this);
    // this.handleClickSearch = this.handleClickSearch.bind(this);
  }

  async onSearchButtonClick() {
    const { queryInput } = this.state;
    const { results } = await getProductsFromCategoryAndQuery(undefined, queryInput);
    console.log(results);
    this.setState({
      hasSearched: true,
      sarchedProducts: results,
    });
    // console.log(queryInput);
  }

  // handleClickSearch() {
  //   console.log('Testesss');
  // }

  onInputChange = ({ target }) => {
    const { name, value } = target;
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
      hasSearched,
      sarchedProducts,
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
            onClick={ this.onSearchButtonClick }
          >
            Buscar
          </button>
        </section>
        <section className="product-search-result">
          { !hasSearched
            && <p>Digite algum termo de pesquisa ou escolha uma categoria.</p>}
          { hasSearched
            && sarchedProducts.map((product) => (
              <div key={ product.id }>
                <ProductCard
                  productImg={ product.thumbnail }
                  productName={ product.title }
                  productPrice={ product.price }
                />
              </div>)) }
        </section>
      </div>
    );
  }
}
