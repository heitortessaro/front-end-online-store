import React, { Component } from 'react';

export default class Home extends Component {
  render() {
    return (
      <div>
        <label htmlFor="input-search" data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
          <input type="text" id="input-search" name="search" />
        </label>
      </div>
    );
  }
}
