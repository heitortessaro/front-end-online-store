import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Product extends Component {
  state = { }

  render() {
    const { match } = this.props;
    // const { productName, match: { params: {
    //   id,
    // } } } = this.props;
    console.log(match);
    return (
      <div data-testid="product-detail-name">
        Pagina de produto detalhado
        <p>
          teste
          {' '}
          {}
          {' '}
          teste
        </p>
      </div>
    );
  }
}

Product.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Product;
