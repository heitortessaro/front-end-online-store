import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Categories from '../components/Categories';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queryInput: '',
      hasSearched: false,
      sarchedProducts: [],
      categories: [],
    };
    this.onSearchButtonClick = this.onSearchButtonClick.bind(this);
  }

  componentDidMount() {
    this.categoriesList();
  }

  async onSearchButtonClick() {
    const { queryInput } = this.state;
    try {
      const results = await getProductsFromCategoryAndQuery(null, queryInput);
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

  onCategoriesClick = async ({ target }) => {
    const { id } = target;
    console.log(id);

    try {
      const results = await getProductsFromCategoryAndQuery(id, null);
      // console.log(results);
      this.setState({
        hasSearched: true,
        sarchedProducts: results,
      });
    } catch (error) {
      console.log(error);
    }
  }

  categoriesList = async () => {
    const categoriesRequest = await getCategories();
    this.setState({ categories: categoriesRequest });
    console.log(categoriesRequest);
  }

  render() {
    const {
      queryInput,
      hasSearched,
      sarchedProducts,
      categories,
    } = this.state;
    return (
      <div>
        <section data-testid="home-initial-message">
          <p>Digite algum termo de pesquisa ou escolha uma categoria.</p>
          <Link
            data-testid="shopping-cart-button"
            to="/carrinho"
          >
            <img
              width="50px"
              src="../image/carrinho-de-compras.png"
              alt="icone de carrinho de compras"
            />
          </Link>
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
        {categories.map((categorie) => (<Categories
          key={ categorie.id }
          propId={ categorie.id }
          propCategorie={ categorie.name }
          propOnClickCategory={ this.onCategoriesClick }
        />)) }
        <section className="product-search-result">
          { hasSearched && sarchedProducts.length > 0
            && sarchedProducts.map((product) => (
              <Link
                to={ `/produto${product.id}` }
                key={ product.id }
                data-testid="product-detail-link"

              >
                <div
                  className="product-card"
                >
                  <ProductCard
                    productImg={ product.thumbnail }
                    productName={ product.title }
                    productPrice={ product.price }
                  />
                </div>
              </Link>
            ))}
          { hasSearched && sarchedProducts.length === 0
            && <p data-testid="product"> Nenhum produto foi encontrado</p> }
        </section>
      </div>
    );
  }
}
