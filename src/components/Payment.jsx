import React, { Component } from 'react';

class Payment extends Component {
    state = { }

    render() {
      return (
        <div className="payment">
          <h3>Métodos de Pagamento</h3>
          <label htmlFor="ticket">
            <h4>Boleto</h4>
            <input type="radio" id="ticket" />
          </label>
          <h4>Cartão de Crédito</h4>
          <label htmlFor="visa">
            <h5>Visa</h5>
            <input type="radio" id="visa" />
          </label>
          <label htmlFor="mastercard">
            <h5>MasterCard</h5>
            <input type="radio" id="masterCard" />
          </label>
          <label htmlFor="Elo">
            <h5>Elo</h5>
            <input type="radio" id="Elo" />
          </label>

        </div>
      );
    }
}

export default Payment;
