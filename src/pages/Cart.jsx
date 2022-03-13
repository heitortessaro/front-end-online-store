import React, { Component } from 'react';
import { getItemsOfList } from '../services/api';
import ProductCardOfCart from '../components/ProductCardOfCart';

export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasItem: false,
      productsInsideCart: [],
    };
  }

  componentDidMount() {
    const productList = this.loadProductsOnLocalStorage();
    if (productList) {
      this.fetchItem(productList);
      this.setState({
        hasItem: true,
      });
    }
  }

  loadProductsOnLocalStorage = () => {
    const productList = Object.keys(localStorage);
    return productList;
  }

  async fetchItem(list) {
    const productsInfo = await getItemsOfList(list);
    // console.log(productsInfo);
    this.setState({ productsInsideCart: productsInfo });
  }

  render() {
    const {
      hasItem,
      productsInsideCart,
    } = this.state;
    return (
      <div>
        { !hasItem
        && (
          <p data-testid="shopping-cart-empty-message">
            Seu carrinho está vazio
          </p>
        )}
        { hasItem
        && (
          <div className="cart-item">
            {productsInsideCart.map((product) => (
              <ProductCardOfCart
                key={ product.id }
                productImg={ product.thumbnail }
                productName={ product.title }
                productPrice={ product.price }
                productQuantity={ JSON.parse(window.localStorage.getItem(product.id)) }
              />
            )) }
          </div>
        ) }
      </div>
    );
  }
}
