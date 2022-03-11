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
    const { propId, propCategorie } = this.props;
    return (
      <section className="section-categories">

        <button data-testid="category" type="button" id={ propId }>
          {propCategorie}
        </button>

      </section>
    );
  }
}

Categories.propTypes = {
  propId: PropTypes.string.isRequired,
  propCategorie: PropTypes.string.isRequired,
};

export default Categories;
