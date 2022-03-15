import React, { Component } from 'react';
import Payment from '../components/Payment';
import { getItemsOfList } from '../services/api';
import states from '../services/data';

class Buy extends Component {
    state = { }

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
        // console.log(productsInfo);
        this.setState({ productsInsideCart: productsInfo });
      }

      render() {
        return (
          <>
            <div className="my-productds">
              <h3>Revise seus Produtos</h3>
              <p>Total:</p>
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
