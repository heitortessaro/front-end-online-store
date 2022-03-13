import React, { Component } from 'react';

export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productsInsideCart: {}
    };
  }

  componentDidMount() {
    this.loadProducsOnLocalStorage();
  }

  loadProducsOnLocalStorage = () => {
    const response = Object.keys(localStorage);
    // const response = JSON.parse(window.localStorage.getItem());
    console.log(response);
  }

  render() {
    return (
      <div>
        <p data-testid="shopping-cart-empty-message">
          Seu carrinho está vazio
        </p>
      </div>
    );
  }
}
