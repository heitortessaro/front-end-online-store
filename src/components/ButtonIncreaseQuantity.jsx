import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ButtonIncreaseQUantity extends Component {
  render() {
    const {
      productId,
      increaseQuantity,
      disabled,
    } = this.props;
    return (
      <div className="button-reduce-quantity">
        <button
          type="button"
          data-testid="product-increase-quantity"
          disabled={ disabled }
          onClick={ () => increaseQuantity(productId) }
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
  disabled: PropTypes.bool.isRequired,
};
