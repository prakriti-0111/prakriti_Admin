import ReactDOM from "react-dom";

// third party
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import * as serviceWorker from "serviceWorker";

// project imports
import App from "App";
import store from "./store";

// style + assets
import "assets/scss/style.scss";
import "../src/index.css";
import config from "./config";
import { display } from "@mui/system";
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename={config.basename}>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

window.onload = function () {
  setInterval(() => {
    var url = window.location.href; 
    if (document.getElementsByClassName("sale-view-button").length!=0) {
      if (
        url.includes("super-admin") ||
        url.includes("admin") ||
        url.includes("distributor") ||
        url.includes("team")
      ) {
        document
          .getElementsByClassName("sale-view-button")[0]
          .classList.add("d-none");
      }
    }
  }, 1000);
};
