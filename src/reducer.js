import {
  CLEAR_CART,
  REMOVE,
  INCREASE,
  DECREASE,
  DISPLAY_ITEMS,
  LOADING,
} from './actions';
const reducer = (state, action) => {
  if (action.type === LOADING) {
    return { ...state, isLoading: true };
  }

  if (action.type === DISPLAY_ITEMS) {
    const newCart = new Map(action.cart.map((item) => [item.id, item]));
    return { ...state, isLoading: false, cart: newCart };
  }

  if (action.type === CLEAR_CART) {
    return { ...state, cart: new Map() };
  }

  if (action.type === REMOVE) {
    const updatedCart = new Map(state.cart);
    updatedCart.delete(action.id);
    return { ...state, cart: updatedCart };
  }

  if (action.type === INCREASE) {
    const id = action.id;
    const newCart = new Map(state.cart);
    const item = newCart.get(id);
    item.amount += 1;
    newCart.set(id, item);
    return { ...state, cart: newCart };
  }

  if (action.type === DECREASE) {
    const id = action.id;
    const newCart = new Map(state.cart);
    const item = newCart.get(id);
    if (item.amount === 1) {
      newCart.delete(id);
      return { ...state, cart: newCart };
    }
    item.amount -= 1;
    newCart.set(id, item);
    return { ...state, cart: newCart };
  }
  return state;
};

export default reducer;
