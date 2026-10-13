const products = require('../../src/data/products');
const { searchProducts } = require('../../src/catalog');

describe('searchProducts', () => {
  const ids = (search) => searchProducts(products, search).map((p) => p.id);
  test("'Наушники' возвращает товар с ID 1", () => {
    expect(ids('Наушники')).toEqual([1]);
  });
  test("'Чистый код' возвращает товар с ID 6", () => {
    expect(ids('Чистый код')).toEqual([6]);
  });
  test("'Настольная лампа' возвращает товар с ID 4", () => {
    expect(ids('Настольная лампа')).toEqual([4]);
  });
  test("'javascript' возвращает товар с ID 3", () => {
    expect(ids('javascript')).toEqual([3]);
  });
  test("'ЧЕХОЛ' возвращает товар с ID 5", () => {
    expect(ids('ЧЕХОЛ')).toEqual([5]);
  });
  test.todo("'наушники' возвращает товар с ID 1");
  test.todo('пустая строка возвращает товары с ID [1, 2, 3, 4, 5, 6]');
  test.todo('строка из пробелов возвращает товары с ID [1, 2, 3, 4, 5, 6]');
  test.todo("'\\t\\n' возвращает товары с ID [1, 2, 3, 4, 5, 6]");
});
