import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoadingt: true,
  userId: "",
  userType: "unauthorized",
  shoppingCart: [],
  error: "",
};

const onlineStoreReducer = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.productList.push(action.payload);
      return state;
    },

    signIn: (state, action) => {
      console.log(action.payload);
      return {
        ...state,
        userType: action.payload.userType,
        shoppingCart: action.payload.shoppingCart,
        userId: action.payload._id,
      };
    },

    signOut: (state, action) => {
      return {
        ...state,
        userId: "",
        userType: "unauthorized",
        shoppingCart: [],
      };
    },

    addProduct: (state, action) => {
      state.productList.push(action.payload);
      return state;
    },

    updateProduct: (state, action) => {
      return state.map((product) => {
        if (product.id === action.payload.id) {
          return {
            ...product,
            item: action.payload.item,
          };
        }
        return product;
      });
    },
    //completed
    completeTodos: (state, action) => {
      return state.map((todo) => {
        if (todo.id === action.payload) {
          return {
            ...todo,
            completed: true,
          };
        }
        return todo;
      });
    },
  },
});

export const { addUser, signIn, signOut, updateProduct } =
  onlineStoreReducer.actions;
export const reducer = onlineStoreReducer.reducer;
