import { ajaxConfigHelper } from "../helper/index";
import { signIn, getProduct } from "../redux/reducer";

export const signInAuth = (dispatch) => async (vaule) => {
  try {
    const response = await fetch(
      "http://localhost:5000/authentication",
      ajaxConfigHelper(vaule, "POST")
    );

    const result = await response.json();
    dispatch(signIn(...result));
  } catch (e) {
    console.log(e);
  }
};

export const signUp = (dispatch) => async (vaule) => {
  console.log(vaule);
  try {
    const response = await fetch(
      "http://localhost:5000/user",
      ajaxConfigHelper(vaule, "POST")
    );

    const result = await response.json();
  } catch (e) {
    console.log(e);
  }
};

export const addNewProduct = () => async (vaule) => {
  try {
    const response = await fetch(
      "http://localhost:5000/product",
      ajaxConfigHelper(vaule, "POST")
    );

    const result = await response.json();
  } catch (e) {
    console.log(e);
  }
};

export const updateProduct = () => async (id, vaule) => {
  try {
    const response = await fetch(
      `http://localhost:5000/product/${id}`,
      ajaxConfigHelper(vaule, "PATCH")
    );

    const result = await response.json();
  } catch (e) {
    console.log(e);
  }
};

export const getAllProduct = (dispatch) => async () => {
  try {
    const response = await fetch("http://localhost:5000/");

    const result = await response.json();
    dispatch(getProduct(result));
  } catch (e) {
    console.log(e);
  }
};
