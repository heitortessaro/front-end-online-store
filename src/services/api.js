export async function getCategories() {
  const ULR_CATEGORIES = 'https://api.mercadolibre.com/sites/MLB/categories';
  const response = await fetch(ULR_CATEGORIES);
  const data = await response.json();
  return data;
}

export async function getProductsFromCategoryAndQuery(categoryId = undefined, query) {
  let url = 'https://api.mercadolibre.com/sites/MLB/search';
  if (categoryId && query) {
    url = `${url}?category=${categoryId}&q=${query}`;
  } else if (categoryId) {
    url = `${url}?category=${categoryId}`;
  } else if (query) {
    url = `${url}?q=${query}`;
  }
  // const url = `https://api.mercadolibre.com/sites/MLB/search?category=$${categoryId}&q=$${query}`
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getItem(id) {
  const ULR_ITEMS = 'https://api.mercadolibre.com/items/';
  try {
    const response = await fetch(`${ULR_ITEMS}${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return {};
  }
}
