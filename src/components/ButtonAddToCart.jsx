import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ButtonAddToCart extends Component {
  render() {
    const {
      productObj,
      add2Cart,
      datatesteid,
    } = this.props;
    return (
      <div
        className="button-add-to-cart"
      >
        <button
          type="button"
          data-testid={ datatesteid }
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
  datatesteid: PropTypes.string.isRequired,
};
