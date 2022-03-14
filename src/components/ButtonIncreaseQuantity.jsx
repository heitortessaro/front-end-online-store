import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ButtonIncreaseQUantity extends Component {
  constructor(props) {
    super(props);
    this.state = { buttonDisabled: false };
  }

  // increaseQuantity = (id) => {
  //   const response = JSON.parse(window.localStorage.getItem(id));
  //   if (response) {
  //     window.localStorage.setItem(id, `${response + 1}`);
  //   }
  // }

  render() {
    const {
      productId,
      increaseQuantity,
    } = this.props;
    const {
      buttonDisabled,
    } = this.state;
    return (
      <div className="button-reduce-quantity">
        <button
          type="button"
          data-testid="product-increase-quantity"
          disabled={ buttonDisabled }
          onClick={ () => increaseQuantity(productId) }
          // onClick={ () => reduceQuantity(productId) }
        >
          +
        </button>
      </div>
    );
  }
}

ButtonIncreaseQUantity.propTypes = {
  productId: PropTypes.string.isRequired,
  increaseQuantity: PropTypes.func.isRequired,
};
