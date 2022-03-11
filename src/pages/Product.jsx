import React, { Component } from 'react';

class Product extends Component {
  state = { }

  render() {
    const { match: { params: {
      id,
    } } } = this.props;
    console.log(id);
    return (
      <div>Pagina de produto detalhado </div>
    );
  }
}

Product.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Product;
