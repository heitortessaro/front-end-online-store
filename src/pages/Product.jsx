import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getItem } from '../services/api';
import Checkout from '../components/Checkout';

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

  render() {
    const { product } = this.state;
    console.log(product);
    return (
      <div data-testid="product-detail-name">
        <h1>Detalhes do Produto</h1>
        <Checkout />
        <h3>
          {product.title}
        </h3>
        <img src={ product.thumbnail } alt={ product.title } />
        <p>{product.price}</p>
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
