import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ProductCardOfCart extends Component {
  render() {
    const {
      productImg,
      productName,
      productPrice,
      productQuantity,
    } = this.props;
    return (
      <div data-testid="product">
        <h3
          data-testid="shopping-cart-product-name"
        >
          { productName }
        </h3>
        <img src={ productImg } alt={ productName } />
        <span>{ productPrice }</span>
        <span
          data-testid="shopping-cart-product-quantity"
        >
          { productQuantity }
        </span>
      </div>
    );
  }
}

ProductCardOfCart.propTypes = {
  productImg: PropTypes.string.isRequired,
  productName: PropTypes.string.isRequired,
  productPrice: PropTypes.number.isRequired,
  productQuantity: PropTypes.number.isRequired,
};
