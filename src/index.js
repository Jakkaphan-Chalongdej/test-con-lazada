import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { getProducts } from "./store/actions/Action.product";
import store from "./store/store";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap";

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

store.dispatch(getProducts()).then(() => {
  ReactDOM.render(app, document.getElementById("root"));
});
