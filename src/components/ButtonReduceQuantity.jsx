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
      window.localStorage.setItem(id, `${response - 1}`);
      if (response < 1) {
        this.setState({ buttonDisabled: true });
      }
    }
  }

  render() {
    const {
      productId,
    } = this.props;
    const {
      buttonDisabled,
    } = this.state;
    return (
      <div className="button-reduce-quantity">
        <button
          type="button"
          data-testid="product-add-to-cart"
          disabled={ buttonDisabled }
          onClick={ () => this.reduceQuantity(productId) }
        >
          -
        </button>
      </div>
    );
  }
}

ButtonReduceQUantity.propTypes = {
  productId: PropTypes.string.isRequired,
};
