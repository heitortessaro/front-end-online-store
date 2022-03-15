import React, { Component } from 'react';
import Payment from '../components/Payment';
import ProductCardOfCart from '../components/ProductCardOfCart';
import states from '../services/data';

class Buy extends Component {
    state = {
      productsInsideCart: [],
      total: 0,
    }

    componentDidMount() {
      const productList = this.loadProductsOnLocalStorage();
      if (productList.length !== 0) {
        this.loadItemsObj(productList);
      }
    }

    loadProductsOnLocalStorage = () => {
      const productList = Object.keys(localStorage);
      return productList;
    }

    loadItemsObj(list) {
      const productsInfo = list.map((id) => JSON.parse(window.localStorage.getItem(id)));
      const totalValue = productsInfo.reduce((acc, current) => acc + current.price, 0);
      this.setState({
        total: totalValue.toFixed(2),
        productsInsideCart: productsInfo,
      });
    }

    render() {
      const { productsInsideCart, total } = this.state;
      return (
        <>
          <div className="my-productds">
            <h3>Revise seus Produtos</h3>
            { productsInsideCart.map((product, index) => (
              <div key={ index + product.id }>
                <ProductCardOfCart
                  productImg={ product.thumbnail }
                  productName={ product.title }
                  productPrice={ product.price }
                  productQuantity={ product.quantity }
                />

              </div>
            )) }

            <p>
              Total:
              { total}
              R$
            </p>
          </div>
          <div className="buyer-info">
            <h3>Informações do Comprador</h3>
            <form className="buyer-form">
              <div className="pessoas-information">
                <input
                  data-testid="checkout-fullname"
                  type="text"
                  placeholder="Nome Completo"
                />
                <input data-testid="checkout-cpf" type="text" placeholder="CPF" />
                <input data-testid="checkout-email" type="text" placeholder="Email" />
                <input data-testid="checkout-phone" type="tel" placeholder="Telefone" />
              </div>
              <div className="complet-address">
                <input data-testid="checkout-cep" type="text" placeholder="CEP" />
                <input
                  data-testid="checkout-address"
                  type="text"
                  placeholder="Endereço"
                />
              </div>
              <div className="details-address">
                <input type="text" placeholder="Complemento" />
                <input type="text" placeholder="Número" />
                <input type="text" placeholder="Cidade" />
                <select className="state">
                  {states.abr.map((state, index) => (
                    <option key={ state } value={ state }>{states.name[index]}</option>
                  ))}
                </select>
              </div>
              <Payment />
            </form>
          </div>
        </>
      );
    }
}

export default Buy;
