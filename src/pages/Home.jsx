import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Categories from '../components/Categories';
import ButtonAddToCart from '../components/ButtonAddToCart';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import Checkout from '../components/Checkout';
import IconCart from '../components/IconCart';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queryInput: '',
      hasSearched: false,
      sarchedProducts: [],
      categories: [],
      productQuantity: 0,
    };
    this.onSearchButtonClick = this.onSearchButtonClick.bind(this);
  }

  componentDidMount() {
    this.categoriesList();
    this.getAllLocalStorage();
  }

  async onSearchButtonClick() {
    const { queryInput } = this.state;
    try {
      const search = await getProductsFromCategoryAndQuery(null, queryInput);
      this.setState({
        hasSearched: true,
        sarchedProducts: search.results,
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
    try {
      const search = await getProductsFromCategoryAndQuery(id, null);
      this.setState({
        hasSearched: true,
        sarchedProducts: search.results,
      });
    } catch (error) {
      console.log(error);
    }
  }

  add2Cart = async (product) => {
    const { id } = product;
    const response = JSON.parse(window.localStorage.getItem(id));
    if (response) {
      product.quantity += 1;
      window.localStorage.setItem(id, JSON.stringify(product));
    } else {
      product.quantity = 1;
      window.localStorage.setItem(id, JSON.stringify(product));
    }
    this.getAllLocalStorage();
  }

  categoriesList = async () => {
    const categoriesRequest = await getCategories();
    this.setState({ categories: categoriesRequest });
  }

  getAllLocalStorage = () => {
    const values = [];
    const keys = Object.keys(localStorage);
    for (let index = 0; index < keys.length; index += 1) {
      values.push(localStorage.getItem(keys[index]));
    }
    // console.log(values);
    const numberOfItems = values.map((element) => JSON.parse(element))
      .reduce((acc, current) => acc + current.quantity, 0);
    // console.log(numberOfItems);
    this.setState({ productQuantity: numberOfItems });
  }

  render() {
    const {
      queryInput,
      hasSearched,
      sarchedProducts,
      categories,
      productQuantity,
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
          <Checkout />
          <IconCart propQuantity={ productQuantity } />
        </section>
        {categories.map((categorie) => (<Categories
          key={ categorie.id }
          propId={ categorie.id }
          propCategorie={ categorie.name }
          propOnClickCategory={ this.onCategoriesClick }
        />)) }
        <section className="product-search-result">
          { hasSearched && sarchedProducts.length > 0
            && sarchedProducts.map((product, index) => (
              <div key={ product.id }>
                <Link
                  to={ `/produto${product.id}` }
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
                <ButtonAddToCart
                  productObj={ product }
                  key={ index }
                  datatesteid="product-add-to-cart"
                  add2Cart={ this.add2Cart }
                />
              </div>
            ))}
          { hasSearched && sarchedProducts.length === 0
            && <p data-testid="product"> Nenhum produto foi encontrado</p> }
        </section>
      </div>
    );
  }
}
