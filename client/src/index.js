import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AddItem from "./components/AddItem";

const app = (
  <Router>
    <div>
      <Route path="/" component={App} />
      <Route path="/add-item" component={AddItem} />
    </div>
  </Router>
);

ReactDOM.render(app, document.getElementById("root"));
serviceWorker.unregister();
