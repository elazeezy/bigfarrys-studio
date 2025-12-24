import { createContext, useContext, useMemo, useReducer } from "react";

const CartContext = createContext(null);

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const { product, size, qty } = action.payload;
      const key = `${product.id}_${size}`;
      const existing = state.items[key];

      const nextItems = {
        ...state.items,
        [key]: {
          key,
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          size,
          qty: existing ? existing.qty + qty : qty
        }
      };

      return { ...state, items: nextItems };
    }

    case "REMOVE": {
      const next = { ...state.items };
      delete next[action.payload.key];
      return { ...state, items: next };
    }

    case "SET_QTY": {
      const { key, qty } = action.payload;
      if (!state.items[key]) return state;
      const next = { ...state.items, [key]: { ...state.items[key], qty } };
      if (qty <= 0) delete next[key];
      return { ...state, items: next };
    }

    case "CLEAR":
      return { ...state, items: {} };

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: {} });

  const api = useMemo(() => {
    const list = Object.values(state.items);
    const subtotal = list.reduce((sum, i) => sum + i.price * i.qty, 0);

    return {
      items: list,
      subtotal,
      count: list.reduce((sum, i) => sum + i.qty, 0),

      addToCart: (product, size, qty = 1) =>
        dispatch({ type: "ADD", payload: { product, size, qty } }),

      removeFromCart: (key) => dispatch({ type: "REMOVE", payload: { key } }),

      setQty: (key, qty) => dispatch({ type: "SET_QTY", payload: { key, qty } }),

      clear: () => dispatch({ type: "CLEAR" })
    };
  }, [state.items]);

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
