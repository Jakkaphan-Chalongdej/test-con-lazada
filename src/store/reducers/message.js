import * as actionTypes from "../actions/actionTypes";

const initialState = {};

const Messages = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_MESSAGE:
      return { message: action.payload, color: action.color };
    case actionTypes.CLEAR_MESSAGE:
      return { message: "" };
    default:
      return state;
  }
};
export default Messages;
