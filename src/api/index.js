import { ajaxConfigHelper } from "../helper/index";
import { signIn, switchUser } from "../redux/reducer";

export const signInAuth = (dispatch) => async (vaule) => {
  try {
    const response = await fetch(
      "http://localhost:5000/authentication",
      ajaxConfigHelper(vaule)
    );

    const result = await response.json();
    dispatch(signIn(...result));
  } catch (e) {
    console.log(e);
  }
};
