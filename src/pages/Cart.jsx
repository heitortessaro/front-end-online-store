import React, { Component } from 'react';
import { getItemsOfList } from '../services/api';
import ProductCardOfCart from '../components/ProductCardOfCart';
import ButtonIncreaseQUantity from '../components/ButtonIncreaseQuantity';
import ButtonReduceQUantity from '../components/ButtonReduceQuantity';

export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasItem: false,
      productsInsideCart: [],
      itemsQuantity: [],
    };
  }

  componentDidMount() {
    const productList = this.loadProductsOnLocalStorage();
    if (productList.length !== 0) {
      this.fetchItem(productList);
      this.setState({
        hasItem: true,
      });
    }
  }

  loadProductsOnLocalStorage = () => {
    const productList = Object.keys(localStorage);
    return productList;
  }

  reduceQuantity = (id) => {
    const { itemsQuantity, productsInsideCart } = this.state;
    const response = JSON.parse(window.localStorage.getItem(id));
    // if (response) {
    if (response - 1 < 1) {
      window.localStorage.removeItem(id);
      const newCart = productsInsideCart.filter((product) => !(Object
        .keys(product).includes(id)));
      const newItemsQuantity = itemsQuantity
        .filter((product) => product[0] !== id);
      this.setState({
        itemsQuantity: newItemsQuantity,
        productsInsideCart: newCart,
      });
    } else {
      window.localStorage.setItem(id, `${response - 1}`);
      const quantity = Object.entries(localStorage);
      this.setState({ itemsQuantity: quantity });
    }
    // }
  }

  async fetchItem(list) {
    const productsInfo = await getItemsOfList(list);
    // const quantity = productsInfo.map((product) => {
    //   const cartItemQuantity = JSON.parse(window.localStorage.getItem(product.id));
    //   // const productId = ;
    //   return { [product.id]: cartItemQuantity };
    // });
    const quantity = Object.entries(localStorage);
    // console.log(productsInfo);
    // console.log(quantity);
    this.setState({
      productsInsideCart: productsInfo,
      itemsQuantity: quantity,
    });
  }

  render() {
    const {
      hasItem,
      productsInsideCart,
      itemsQuantity,
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
          <div className="cart-item">
            {productsInsideCart.map((product) => (
              <div key={ product.id }>
                <ProductCardOfCart
                  productImg={ product.thumbnail }
                  productName={ product.title }
                  productPrice={ product.price }
                  // duas opções:
                  // deixar as funcoes nos botões e utilizar uma callback para atualizar o estado quantity
                  // puxar as funcoes para a page Cart e depois passá-las como prop
                  // productQuantity={ JSON.parse(window.localStorage.getItem(product.id)) }
                  // productQuantity={ Object.values(itemsQuantity.filter((productObj) => Object
                  //   .keys(productObj).includes(product.id))[0]) }
                  productQuantity={ itemsQuantity
                    .filter((productArr) => productArr[0] === product.id)[0] }
                />
                <ButtonIncreaseQUantity productId={ product.id } />
                <ButtonReduceQUantity
                  productId={ product.id }
                  reduceQuantity={ this.reduceQuantity }
                />
              </div>
            )) }
          </div>
        ) }
      </div>
    );
  }
}
