import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Categories extends Component {
  render() {
    const { propId, propCategorie, propOnClickCategory } = this.props;
    return (
      <section className="section-categories">

        <button
          data-testid="category"
          type="button"
          id={ propId }
          onClick={ propOnClickCategory }
        >
          {propCategorie}
        </button>

      </section>
    );
  }
}

Categories.propTypes = {
  propId: PropTypes.string.isRequired,
  propCategorie: PropTypes.string.isRequired,
  propOnClickCategory: PropTypes.func.isRequired,
};

export default Categories;
