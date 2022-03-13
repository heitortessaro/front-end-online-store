export async function getCategories() {
  const ULR_CATEGORIES = 'https://api.mercadolibre.com/sites/MLB/categories';
  const response = await fetch(ULR_CATEGORIES);
  const data = await response.json();
  return data;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  let url = 'https://api.mercadolibre.com/sites/MLB/search';
  if (categoryId && query) {
    url = `${url}?category=${categoryId}&q=${query}`;
  } else if (categoryId) {
    url = `${url}?category=${categoryId}`;
  } else if (query) {
    url = `${url}?q=${query}`;
  }
  // const url = `https://api.mercadolibre.com/sites/MLB/search?category=$${categoryId}&q=$${query}`
  // const response = await fetch(url);
  // const data = await response.json();
  // return data;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return {};
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

// Realizar multiplas chamadas de API usando for resultava em erro de LINT
// Buscando uma alternativa encontrei a descrita abaixo com .map
// multiple API calls using map instead loop
// https://dev.to/askrishnapravin/for-loop-vs-map-for-making-multiple-api-calls-3lhd
export async function getItemsOfList(list) {
  const ULR_ITEMS = 'https://api.mercadolibre.com/items/';
  let objArray = [];
  if (list.length === 0) {
    return objArray;
  }
  await Promise.all(
    list.map(async (id) => {
      const response = await fetch(`${ULR_ITEMS}${id}`);
      const data = await response.json();
      objArray = [...objArray, data];
    }),
  );
  return objArray;
}
