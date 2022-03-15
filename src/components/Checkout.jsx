import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Checkout extends Component {
    state = { }

    render() {
      return (
        <Link to="/comprar">
          <button data-testid="checkout-products" type="button">Comprar</button>
        </Link>
      );
    }
}

export default Checkout;
