import { createContext } from 'react';
import { useContext, useReducer, useEffect } from 'react';
import reducer from './reducer';
import cartItems from './data';
import {
  CLEAR_CART,
  REMOVE,
  INCREASE,
  DECREASE,
  DISPLAY_ITEMS,
  LOADING,
} from './actions';
import { getTotals } from './utils';
const url = 'https://www.course-api.com/react-useReducer-cart-project';

const initialState = {
  isLoading: false,
  cart: new Map(),
};

const AppContext = createContext();
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { totalAmount, total } = getTotals(state.cart);

  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  const removeItem = (id) => {
    dispatch({ type: REMOVE, id });
  };

  const increaseQuantity = (id) => {
    dispatch({ type: INCREASE, id });
  };

  const decreaseQuantity = (id) => {
    dispatch({ type: DECREASE, id });
  };

  const fetchData = async () => {
    dispatch({ type: LOADING });
    const response = await fetch(url);
    const cart = await response.json();
    dispatch({ type: DISPLAY_ITEMS, cart });
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        removeItem,
        increaseQuantity,
        decreaseQuantity,
        totalAmount,
        total,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);
