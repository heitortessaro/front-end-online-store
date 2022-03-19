import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getItem } from '../services/api';
import Checkout from '../components/Checkout';
import ButtonAddToCart from '../components/ButtonAddToCart';
import IconCart from '../components/IconCart';

class Product extends Component {
  state = {
    product: {},
    productQuantity: 0,
    loading: true,
  }

  componentDidMount() {
    this.getDetails();
    this.getAllLocalStorage();
  }

  getDetails = async () => {
    const { match: { params: {
      id } } } = this.props;
    const requestProduct = await getItem(id);
    this.setState({
      product: requestProduct,
      loading: false,
    });
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
    }
    this.getAllLocalStorage();
  }

  getAllLocalStorage = () => {
    const values = [];
    const keys = Object.keys(localStorage);
    for (let index = 0; index < keys.length; index += 1) {
      values.push(localStorage.getItem(keys[index]));
    }
    // console.log(values);
    const numberOfItems = values.map((element) => JSON.parse(element))
      .reduce((acc, current) => acc + current.quantity, 0);
    // console.log(numberOfItems);
    this.setState({ productQuantity: numberOfItems });
  }

  render() {
    const {
      product,
      productQuantity,
      loading,
    } = this.state;
    return (
      <div data-testid="product-detail-name">
        <h1>Detalhes do Produto</h1>
        <Checkout />
        <IconCart propQuantity={ productQuantity } />
        {loading && <p>Carregando...</p>}
        {!loading
        && (
          <div>
            <h3>
              {product.title}
            </h3>
            <img src={ product.thumbnail } alt={ product.title } />
            <p>{product.price}</p>
            <br />
            {product.shipping.free_shipping
              && <span data-testid="free-shipping">Frete Gratis</span> }
            <ButtonAddToCart
              add2Cart={ this.add2Cart }
              productObj={ product }
              datatesteid="product-detail-add-to-cart"
            />
          </div>)}
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
