const products = require('../../src/data/products');
const { sortProductsByPrice } = require('../../src/catalog');

describe('sortProductsByPrice', () => {
  const select = (...productsId) => productsId.map((id) => products.find((p) => p.id === id));
  const getIds = (items) => items.map((p) => p.id);
  const ids = (sort) => sortProductsByPrice(products, sort).map((p) => p.id);
  test("все товары c 'asc' сортируются как [3, 6, 5, 4, 2, 1]", () => {
    expect(ids('asc')).toEqual([3, 6, 5, 4, 2, 1]);
  });
  test('все товары без направления сортируются как [3, 6, 5, 4, 2, 1]', () => {
    expect(ids()).toEqual([3, 6, 5, 4, 2, 1]);
  });
  test("товары [1, 3, 4] c 'asc' сортируются как [3, 4, 1]", () => {
    expect(getIds(sortProductsByPrice(select(1, 3, 4), 'asc'))).toEqual([3, 4, 1]);
  });
  test("все товары c 'desc' сортируются как [1, 2, 4, 5, 6, 3]", () => {
    expect(ids('desc')).toEqual([1, 2, 4, 5, 6, 3]);
  });
  test("товары [3, 1, 4] c 'desc' сортируются как [1, 4, 3]", () => {
    expect(getIds(sortProductsByPrice(select(3, 1, 4), 'desc'))).toEqual([1, 4, 3]);
  });
  test("товары [5, 2, 6] c 'desc' сортируются как [2, 5, 6]", () => {
    expect(getIds(sortProductsByPrice(select(5, 2, 6), 'desc'))).toEqual([2, 5, 6]);
  });
  test("'asc' не меняет исходный массив [1, 3, 4]", () => {
    const input = select(1, 3, 4);
    sortProductsByPrice(input, 'asc');
    expect(getIds(input)).toEqual([1, 3, 4]);
  });
  test("'desc' не меняет исходный массив [1, 3, 4]", () => {
    const input = select(1, 3, 4);
    sortProductsByPrice(input, 'desc');
    expect(getIds(input)).toEqual([1, 3, 4]);
  });
  test('направление по умолчанию не меняет исходный массив всех товаров', () => {
    const input = [...products];
    sortProductsByPrice(input);
    expect(getIds(input)).toEqual([1, 2, 3, 4, 5, 6]);
  });
});
