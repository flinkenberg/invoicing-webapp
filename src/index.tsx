import React from "react";
import { render } from "react-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import { getClient } from "./client";
import App from "./App";
import "./index.css";
import "react-datepicker/dist/react-datepicker.min.css";

export default render(
  <ApolloProvider client={getClient()}>
    <App />
  </ApolloProvider>,
  document.getElementById("root"),
);
