import * as actionTypes from "../actions/actionTypes";

const initialState = {
  products: [],
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_PRODUCTS:
      let product = action.product;
      return {
        ...state,
        products: product,
      };
    case actionTypes.ADD_PRODUCT:
      return {
        ...state,
        products: action.product,
      };

    default:
      return {
        ...state,
      };
  }
};

export default appReducer;
