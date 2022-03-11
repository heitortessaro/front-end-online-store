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
  }

  async onSearchButtonClick() {
    const { queryInput } = this.state;
    try {
      const results = await getProductsFromCategoryAndQuery(null, queryInput);
      console.log("MEU COMENTARIO");
      console.log(results);
      this.setState({
        hasSearched: true,
        sarchedProducts: results,
      });
    } catch (error) {
      console.log(error);
    }
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  render() {
    const {
      queryInput,
      hasSearched,
      sarchedProducts,
    } = this.state;
    return (
      <div>
        <section data-testid="home-initial-message">
          <p>Digite algum termo de pesquisa ou escolha uma categoria.</p>
          <label htmlFor="seachInput">
            <input
              type="text"
              id="seachInput"
              name="queryInput"
              data-testid="query-input"
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
          { hasSearched && sarchedProducts.length > 0
            && sarchedProducts.map((product) => (
              <div
                key={ product.id }
                className="product-card"
              >
                <ProductCard
                  productImg={ product.thumbnail }
                  productName={ product.title }
                  productPrice={ product.price }
                />
              </div>)) }
          { hasSearched && sarchedProducts.length === 0
            && <p data-testid="product"> Nenhum produto foi encontrado</p> }
        </section>
      </div>
    );
  }
}
