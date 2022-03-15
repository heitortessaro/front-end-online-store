import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ButtonAddToCart extends Component {
  // constructor(props) {
  //   super(props);
  //   this.addProductToCart = this.addProductToCart.bind(this);
  // }
  // add2Cart = (id) => {
  //   const response = JSON.parse(window.localStorage.getItem(id));
  //   if (response) {
  //     window.localStorage.setItem(id, `${response + 1}`);
  //   } else {
  //     window.localStorage.setItem(id, '1');
  //   }
  // }

  render() {
    const {
      productObj,
      add2Cart,
    } = this.props;
    return (
      <div
        className="button-add-to-cart"
      >
        <button
          type="button"
          data-testid="product-add-to-cart"
          onClick={ () => add2Cart(productObj) }
        >
          Adicionar ao Carrinho
        </button>
      </div>
    );
  }
}

ButtonAddToCart.propTypes = {
  productObj: PropTypes.shape({}).isRequired,
  add2Cart: PropTypes.func.isRequired,
};
