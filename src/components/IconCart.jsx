import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class IconCart extends Component {
  render() {
    const { propQuantity } = this.props;
    return (
      <Link
        data-testid="shopping-cart-button"
        to="/carrinho"
      >
        <img
          width="50px"
          src="../image/carrinho-de-compras.png"
          alt="icone de carrinho de compras"
        />
        <span data-testid="shopping-cart-size">{propQuantity}</span>
      </Link>
    );
  }
}

IconCart.propTypes = {
  propQuantity: PropTypes.number.isRequired,
};

export default IconCart;
