function notImplemented() {
  throw new Error('Корзина ещё не реализована. Сначала прочитайте тесты.');
}

function addToCart(cart, product, count) {
  if (count <= 0) {
    throw new RangeError('count <= 0');
  }
  if (count > product.stock) {
    throw new RangeError('count > stock');
  }
  if (cart.find((item) => item.id === product.id)) {
    cart.find((item) => item.id === product.id).quantity += count;
    return cart;
  }
  cart.push({ ...product, quantity: count });
  return cart;
}
function changeQuantity(cart, id, count) {
  if (count <= 0) throw new RangeError('count <= 0');
  const product = cart.find((p) => p.id === id);
  if (!product) return cart;
  if (count > product.stock) throw new RangeError('stock < count');
  product.quantity = count;
  return cart;
}
function removeFromCart(cart, id) {
  return cart.filter((item) => item.id !== id);
}
function calculateCartSubtotal(cart) {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}
function calculateOrderTotal(cart, promo) {
  const subtotal = calculateCartSubtotal(cart);
  const discount = promo === 'SAVE10' && subtotal >= 20000 ? Math.round(subtotal * 0.1) : 0;
  const delivery = subtotal >= 50000 ? 0 : 30000;
  return {
    subtotal,
    discount,
    delivery,
    total: subtotal - discount + delivery,
  };
}

const cartApi = {
  addToCart,
  changeQuantity,
  removeFromCart,
  calculateCartSubtotal,
  calculateOrderTotal,
};

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;
