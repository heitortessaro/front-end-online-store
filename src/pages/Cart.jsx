import React, { Component } from 'react';
import ProductCardOfCart from '../components/ProductCardOfCart';
import Checkout from '../components/Checkout';
import ButtonIncreaseQUantity from '../components/ButtonIncreaseQuantity';
import ButtonReduceQUantity from '../components/ButtonReduceQuantity';

export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasItem: false,
      productsInsideCart: [],
    };
  }

  componentDidMount() {
    const productList = this.loadProductsOnLocalStorage();
    // console.log(productList);
    if (productList.length !== 0) {
      this.loadItemsObj(productList);
      this.setState({
        hasItem: true,
      });
    }
    // if (productList.length !== 0) {
    //   this.fetchItem(productList);
    //   this.setState({
    //     hasItem: true,
    //   });
    // }
  }

  loadProductsOnLocalStorage = () => {
    const productList = Object.keys(localStorage);
    return productList;
  }

  reduceQuantity = (id) => {
    const { productsInsideCart } = this.state;
    const productObj = JSON.parse(window.localStorage.getItem(id));
    if (productObj.quantity - 1 < 1) {
      window.localStorage.removeItem(id);
      let hasItem = true;
      const NUMBER_OF_ITEMS_BEFORE_DROP_OUT = 1;
      if (productsInsideCart.length === NUMBER_OF_ITEMS_BEFORE_DROP_OUT) {
        hasItem = false;
      }
      this.setState(
        { hasItem },
        () => this.updateState(),
      );
    } else {
      productObj.quantity -= 1;
      window.localStorage.setItem(id, JSON.stringify(productObj));
      this.updateState();
    }
  }

  increaseQuantity = (id) => {
    const productObj = JSON.parse(window.localStorage.getItem(id));
    productObj.quantity += 1;
    window.localStorage.setItem(id, JSON.stringify(productObj));
    this.updateState();
  };

  updateState = () => {
    const productList = this.loadProductsOnLocalStorage();
    this.loadItemsObj(productList);
  };

  loadItemsObj(list) {
    const productsInfo = list.map((id) => JSON.parse(window.localStorage.getItem(id)));
    this.setState({
      productsInsideCart: productsInfo,
    });
  }

  render() {
    const {
      hasItem,
      productsInsideCart,
    } = this.state;
    return (
      <div>
        { !hasItem
        && (
          <p data-testid="shopping-cart-empty-message">
            Seu carrinho está vazio
          </p>
        )}
        { hasItem
        && (
          // <div className="cart-item">
          //   {
          <>
            <Checkout />
            { productsInsideCart.map((product, index) => (
              <div key={ index + product.id }>
                <ProductCardOfCart
                  productImg={ product.thumbnail }
                  productName={ product.title }
                  productPrice={ product.price }
                  productQuantity={ product.quantity }
                />
                <ButtonIncreaseQUantity
                  productId={ product.id }
                  increaseQuantity={ this.increaseQuantity }
                />
                <ButtonReduceQUantity
                  productId={ product.id }
                  reduceQuantity={ this.reduceQuantity }
                />
              </div>
            )) }
          </>
        ) }
      </div>
    );
  }
}
