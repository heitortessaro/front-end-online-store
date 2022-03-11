import React, { Component } from 'react';
import Categories from '../components/Categories';
import { getCategories } from '../services/api';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
    };

    // this.teste = this.teste.bind(this);
    // this.categoriesList = this.categoriesList.bind(this);
  }

  componentDidMount() {
    this.categoriesList();
  }

  categoriesList = async () => {
    const categoriesRequest = await getCategories();
    this.setState({ categories: categoriesRequest });
    console.log(categoriesRequest);
  }

  render() {
    const { categories } = this.state;
    return (
      <div>
        <label htmlFor="input-search" data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
          <input type="text" id="input-search" name="search" />
        </label>
        {categories.map((categorie) => (<Categories
          key={ categorie.id }
          propId={ categorie.id }
          propCategorie={ categorie.name }
        />)) }
      </div>
    );
  }
}
