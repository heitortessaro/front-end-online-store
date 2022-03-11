import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Categories extends Component {
  // constructor() {
  // super();
  // this.state = {
  //   categories: '',
  // };
  // }

  render() {
    const { propId, propCategorie, propCategoriesList } = this.props;
    return (
      <section className="section-categories">

        <button
          data-testid="category"
          type="button"
          id={ propId }
          onClick={ propCategoriesList }
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
  propCategoriesList: PropTypes.func.isRequired,
};

export default Categories;
