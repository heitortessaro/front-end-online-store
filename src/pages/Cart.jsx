import React, { Component } from 'react';
import { getItem, getItemsOfList } from '../services/api';

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
    // for (let index = 0; index < list.length; index += 1) {
    //   const response = await getItem(list[index]);
    //   console.log(response);
    // }
    const response = await getItemsOfList(list);
    console.log(response);
    console.log("foi");
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
      </div>
    );
  }
}
