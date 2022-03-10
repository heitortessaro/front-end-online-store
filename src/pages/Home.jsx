import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Home extends Component {
  render() {
    return (
      <div>
        <label htmlFor="input-search" data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
          <input type="text" id="input-search" name="search" />
        </label>
        <Link
          data-testid="shopping-cart-button"
          to="/carrinho"
        >
          <img
            width="50px"
            src="../image/carrinho-de-compras.png"
            alt="icone de carrinho de compras"
          />
        </Link>
      </div>

    );
  }
}
