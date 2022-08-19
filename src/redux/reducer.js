import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllProduct } from "../api";
import { ajaxConfigHelper } from "../helper";

const initialState = {
  isLoadingt: true,

  userId: "",
  userType: "unauthorized",
  shoppingCart: [],
  status: null,
};

export const getProduct = createAsyncThunk("products/getProduct", async () => {
  try {
    const response = await fetch("http://localhost:5000/");

    const result = await response.json();
    return result;
  } catch (e) {
    console.log(e);
  }
});

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (data) => {
    console.log("data is ", data);

    try {
      const response = await fetch(
        `http://localhost:5000/product/${data.id}`,
        ajaxConfigHelper(data.value, "PATCH")
      );
      const result = await response.json();
    } catch (e) {
      console.log(e);
    }
  }
);

export const addNewProduct = createAsyncThunk(
  "products/addNewProduct",
  async (data) => {
    try {
      const response = await fetch(
        `http://localhost:5000/product`,
        ajaxConfigHelper(data.value, "POST")
      );
      const result = await response.json();
    } catch (e) {
      console.log(e);
    }
  }
);

export const addNewUser = createAsyncThunk("users/addNewUser", async (data) => {
  try {
    const response = await fetch(
      `http://localhost:5000/user`,
      ajaxConfigHelper(data.value, "POST")
    );
    const result = await response.json();
  } catch (e) {
    console.log(e);
  }
});

// Not done
export const signInAuth = createAsyncThunk("users/addNewUser", async (data) => {
  try {
    const response = await fetch(
      `http://localhost:5000/user`,
      ajaxConfigHelper(data.value, "POST")
    );
    const result = await response.json();
  } catch (e) {
    console.log(e);
  }
});

export const addShoppingCart = createAsyncThunk(
  "users/addShoppingCart",
  async (data) => {
    try {
      const response = await fetch(
        `http://localhost:5000/user/${data.id}`,
        ajaxConfigHelper(data.value, "PATCH")
      );
      const result = await response.json();

      return result;
    } catch (e) {
      console.log(e);
    }
  }
);
const onlineStoreReducer = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.productList.push(action.payload);
      return state;
    },

    signIn: (state, action) => {
      return {
        ...state,
        userType: action.payload.userType,
        shoppingCart: action.payload.shoppingCart,
        userId: action.payload._id,
        userName: action.payload.email.slice(
          0,
          action.payload.email.indexOf("@")
        ),
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

    updateProducts: (state, action) => {
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
  },
  extraReducers: {
    [addNewUser.pending]: (state, action) => {
      state.status = "loading";
    },
    [addNewUser.fulfilled]: (state, action) => {
      state.status = "success";
    },
    [addNewUser.rejected]: (state, action) => {
      state.status = "failed";
    },
    [signInAuth.pending]: (state, action) => {
      state.status = "loading";
    },
    [signInAuth.fulfilled]: (state, action) => {
      state.status = "success";
    },
    [signInAuth.rejected]: (state, action) => {
      state.status = "failed";
    },
    [addShoppingCart.pending]: (state, action) => {
      state.status = "loading";
    },
    [addShoppingCart.fulfilled]: (state, action) => {
      console.log("payload is ", action.payload);
      state.status = "success";
      state.shoppingCart = action.payload.shoppingCart;
    },
    [addShoppingCart.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

const productReducers = createSlice({
  name: "product",
  initialState: {
    products: [],
    status: null,
  },
  reducers: {
    // getProduct: (state, action) => [...action.payload],

    addProduct: (state, action) => {
      state.productList.push(action.payload);
      return state;
    },
    editProduct: (state, action) => {
      state.productList.push(action.payload);
      return state;
    },
  },
  extraReducers: {
    [getProduct.pending]: (state, action) => {
      state.status = "loading";
    },
    [getProduct.fulfilled]: (state, action) => {
      state.status = "success";
      state.products = action.payload;
    },
    [getProduct.rejected]: (state, action) => {
      state.status = "failed";
    },

    [updateProduct.pending]: (state, action) => {
      state.status = "loading";
    },
    [updateProduct.fulfilled]: (state, action) => {
      state.status = "success";
    },
    [updateProduct.rejected]: (state, action) => {
      state.status = "failed";
    },

    [addNewProduct.pending]: (state, action) => {
      state.status = "loading";
    },
    [addNewProduct.fulfilled]: (state, action) => {
      state.status = "success";
    },
    [addNewProduct.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export const { addUser, signIn, signOut } = onlineStoreReducer.actions;

export const { addProduct, editProduct } = productReducers.actions;

export const reducer = onlineStoreReducer.reducer;
export const productReducer = productReducers.reducer;
