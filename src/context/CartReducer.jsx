export const initialState = {
  cartItems: [],
};

export const CartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const item = action.payload; //
      const existingItem = state.cartItems.find(
        (cartItem) => cartItem.id === item.id, //find ไล่ดูใน cartItems ว่ามีสินค้า id เดียวกันอยู่
      );
      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem,
          ),
        };
      }
      return {
        ...state,
        cartItems: [...state.cartItems, { ...item, quantity: 1 }],
      };
    }
    case "DECREMENT": {
      const id = action.payload;
      return {
        ...state,
        cartItems: state.cartItems
          .map((item) =>
            item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
          )
          .filter((item) => item.quantity > 0),
      };
    }
    case "CLEAR_CART":
      return { ...state, cartItems: [] };
    case "REMOVE_CART_ITEMS": {
      const id = action.payload;
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== id),
      };
    }
    default:
      return state;
  }
};
