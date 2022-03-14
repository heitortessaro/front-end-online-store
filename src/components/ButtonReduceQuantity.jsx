import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ButtonReduceQUantity extends Component {
  constructor(props) {
    super(props);
    this.state = { buttonDisabled: false };
  }

  reduceQuantity = (id) => {
    const response = JSON.parse(window.localStorage.getItem(id));
    if (response) {
      if (response - 1 < 1) {
        window.localStorage.removeItem(id);
        this.setState({ buttonDisabled: true });
      } else {
        window.localStorage.setItem(id, `${response - 1}`);
      }
    }
  }

  render() {
    const {
      productId,
      reduceQuantity,
    } = this.props;
    const {
      buttonDisabled,
    } = this.state;
    return (
      <div className="button-reduce-quantity">
        <button
          type="button"
          data-testid="product-decrease-quantity"
          disabled={ buttonDisabled }
          // onClick={ () => this.reduceQuantity(productId) }
          onClick={ () => reduceQuantity(productId) }
        >
          -
        </button>
      </div>
    );
  }
}

ButtonReduceQUantity.propTypes = {
  productId: PropTypes.string.isRequired,
  reduceQuantity: PropTypes.func.isRequired,
};
