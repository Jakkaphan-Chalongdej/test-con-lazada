import * as actionTypes from "./actionTypes";
import axios from "../../config/axios";
import axios2 from "../../config/axiosLazada";

export const getProducts = () => async (dispatch) => {
  await axios
    .get("product")
    .then((res) => {
      const response = res.data;
      // console.log("Action get Products", response);
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
    .then((getproduct) => {
      console.log(`Action Add Products :`, getproduct);
      console.log(`Action Add Products :`, getproduct.data);
      axios2.post("product/create", getproduct.data);
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
  // console.log("Req", id, update);
  await axios
    .put(`product/${id}`, update)
    .then((getproduct) => {
      console.log("Action Update getProducts :", getproduct);
      axios2.put("product/update", {
        id: id,
        SkuId: getproduct.data.SkuId,
        name: getproduct.data.name,
        img_name: getproduct.data.img_name,
        price: getproduct.data.price,
        quantity: getproduct.data.quantity,
        description: getproduct.data.description,
        category: getproduct.data.category,
      });
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
      axios2.delete(`product/remove/${id}`);
      console.log("Action Delete Products");
      dispatch(getProducts());
    })
    .catch(function (error) {
      console.log(error);
    });
};
