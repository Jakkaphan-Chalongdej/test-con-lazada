import * as actionTypes from "./actionTypes";
import axios from "../../config/axios";

export const getProducts = () => async (dispatch) => {
  await axios
    .get("product")
    .then((res) => {
      const response = res.data;
      console.log("Action get Products", response);
      dispatch({
        type: actionTypes.GET_PRODUCTS,
        product: response,
      });
    })
    .catch(function (error) {
      console.log(error);
    });
};
export const addProducts = (product) => async (dispatch) => {
  await axios
    .post("product/create", product)
    .then(() => {
      console.log("Action Add Products");
      dispatch(getProducts());
      dispatch({
        type: actionTypes.SET_MESSAGE,
        payload: "Add Product Successfully",
        color: "green",
      });
    })
    .catch((error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(error);
      dispatch({
        type: actionTypes.SET_MESSAGE,
        payload: message,
        color: "red",
      });
    });
};
export const UpdataProducts = (id, update) => async (dispatch) => {
  console.log("Req", id, update);
  await axios
    .put(`product/${id}`, update)
    .then(() => {
      console.log("Action Update getProducts");
      dispatch({
        type: actionTypes.SET_MESSAGE,
        payload: "Updata Product Successfully",
        color: "green",
      });
      dispatch(getProducts());
    })
    .catch((error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch({
        type: actionTypes.SET_MESSAGE,
        payload: message,
        color: "red",
      });
    });
};
export const deleteProducts = (id) => async (dispatch) => {
  await axios
    .delete(`product/${id}`)
    .then(() => {
      console.log("Action Delete Products");
      dispatch(getProducts());
    })
    .catch(function (error) {
      console.log(error);
    });
};
