import React, { Component } from 'react';
// import { getItemsOfList } from '../services/api';
import ProductCardOfCart from '../components/ProductCardOfCart';
import ButtonIncreaseQUantity from '../components/ButtonIncreaseQuantity';
import ButtonReduceQUantity from '../components/ButtonReduceQuantity';

export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasItem: false,
      productsInsideCart: [],
      // itemsQuantity: [],
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

  // reduceQuantity = (id) => {
  //   const { itemsQuantity, productsInsideCart } = this.state;
  //   const response = JSON.parse(window.localStorage.getItem(id));
  //   if (response - 1 < 1) {
  //     window.localStorage.removeItem(id);
  //     const newCart = productsInsideCart.filter((product) => id !== product.id);
  //     const quantity = itemsQuantity
  //       .filter((product) => product[0] !== id);
  //     let hasItem = true;
  //     if (quantity.length === 0) {
  //       hasItem = false;
  //     }
  //     this.setState({
  //       productsInsideCart: newCart,
  //       itemsQuantity: quantity,
  //       hasItem,
  //     });
  //   } else {
  //     window.localStorage.setItem(id, `${response - 1}`);
  //     const quantity = Object.entries(localStorage);
  //     this.setState({ itemsQuantity: quantity });
  //   }
  // }

  increaseQuantity = (id) => {
    const productObj = JSON.parse(window.localStorage.getItem(id));
    productObj.quantity += 1;
    window.localStorage.setItem(id, JSON.stringify(productObj));
    const productList = this.loadProductsOnLocalStorage();
    this.loadItemsObj(productList);
    // window.localStorage.setItem(id, `${response + 1}`);
    // const quantity = Object.entries(localStorage);
    // this.setState({ itemsQuantity: quantity });
  }

  // async fetchItem(list) {
  //   const productsInfo = await getItemsOfList(list);
  //   const quantity = Object.entries(localStorage);
  //   this.setState({
  //     productsInsideCart: productsInfo,
  //     itemsQuantity: quantity,
  //   });
  // }

  loadItemsObj(list) {
    const productsInfo = list.map((id) => JSON.parse(window.localStorage.getItem(id)));
    // console.log(productsInfo);
    this.setState({
      productsInsideCart: productsInfo,
    });
  }

  render() {
    const {
      hasItem,
      productsInsideCart,
      // itemsQuantity,
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
          productsInsideCart.map((product, index) => (
            <div key={ index + product.id }>
              <ProductCardOfCart
                productImg={ product.thumbnail }
                productName={ product.title }
                productPrice={ product.price }
                // productQuantity={ itemsQuantity
                //   .filter((productArr) => productArr[0] === product.id)[0] }
                productQuantity={ product.quantity }
              />
              <ButtonIncreaseQUantity
                productId={ product.id }
                increaseQuantity={ this.increaseQuantity }
              />
              <ButtonReduceQUantity
                productId={ product.id }
                // reduceQuantity={ this.reduceQuantity }
              />
            </div>
          ))
          // }
          // </div>
        ) }
      </div>
    );
  }
}
