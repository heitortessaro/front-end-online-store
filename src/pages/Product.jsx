import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getItem } from '../services/api';
import Checkout from '../components/Checkout';
import ButtonAddToCart from '../components/ButtonAddToCart';
import { Link } from 'react-router-dom';

class Product extends Component {
  state = { product: {} }

  componentDidMount() {
    this.getDetails();
  }

  getDetails = async () => {
    const { match: { params: {
      id } } } = this.props;
    const requestProduct = await getItem(id);
    console.log(requestProduct);
    this.setState({ product: requestProduct });
  }

  add2Cart = async (product) => {
    const { id } = product;
    // const productInfo = await getItem(id);
    const response = JSON.parse(window.localStorage.getItem(id));
    if (response) {
      product.quantity += 1;
      // console.log(product.quantity);
      window.localStorage.setItem(id, JSON.stringify(product));
    } else {
      product.quantity = 1;
      window.localStorage.setItem(id, JSON.stringify(product));
      // console.log(product.quantity);
    }
  }

  render() {
    const { product } = this.state;
    console.log(product);
    return (
      <div data-testid="product-detail-name">
        <h1>Detalhes do Produto</h1>
        <Checkout />
        <Link
            data-testid="shopping-cart-button"
            to="/carrinho"
          ></Link>
        <h3>
          {product.title}
        </h3>
        <img src={ product.thumbnail } alt={ product.title } />
        <p>{product.price}</p>
        <ButtonAddToCart
          add2Cart={ this.add2Cart }
          productObj={ product }
          datatesteid="product-detail-add-to-cart"
        />
      </div>
    );
  }
}

Product.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Product;
