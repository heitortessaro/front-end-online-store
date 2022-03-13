import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ButtonAddToCart extends Component {
  // constructor(props) {
  //   super(props);
  //   this.addProductToCart = this.addProductToCart.bind(this);
  // }

  add2Cart = (id) => {
    const response = JSON.parse(window.localStorage.getItem(id));
    if (response) {
      console.log('não vazio');
      console.log(typeof response);
      console.log(response + 1);
      window.localStorage.setItem(id, `${response + 1}`);
    } else {
      window.localStorage.setItem(id, '1');
    }
    // console.log(`quantity ${quantity}`);
  }

  render() {
    const {
      productId,
    } = this.props;
    return (
      <div className="button-add-to-cart">
        <button
          type="button"
          data-testid="product-add-to-cart"
          onClick={ () => this.add2Cart(productId) }
        >
          Comprar
        </button>
      </div>
    );
  }
}

ButtonAddToCart.propTypes = {
  productId: PropTypes.string.isRequired,
};
