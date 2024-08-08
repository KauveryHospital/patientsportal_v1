import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import store from "./store/actions/store";
import { Provider } from "react-redux";
import Modal from 'react-modal';

Modal.setAppElement('#root');

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);