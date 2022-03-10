export async function getCategories() {
  const ULR_CATEGORIES = 'https://api.mercadolibre.com/sites/MLB/categories';
  const response = await fetch(ULR_CATEGORIES);
  const data = await response.json();
  return data;
}

export async function getProductsFromCategoryAndQuery(/* categoryId, query */) {
  // Implemente aqui! Quando o fizer, descomente os parâmetros que essa função recebe
}
