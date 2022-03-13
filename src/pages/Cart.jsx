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

  async fetchItem(list) {
    const productsInfo = await getItemsOfList(list);
    const quantity = productsInfo.map((product) => { 
      const cartItemQuantity = JSON.parse(window.localStorage.getItem(product.id));
      // const productId = ;
      return { [product.id]: cartItemQuantity };
    });
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
                  productQuantity={ JSON.parse(window.localStorage.getItem(product.id)) }
                />
                <ButtonIncreaseQUantity productId={ product.id } />
                <ButtonReduceQUantity productId={ product.id } />
              </div>
            )) }
          </div>
        ) }
      </div>
    );
  }
}
