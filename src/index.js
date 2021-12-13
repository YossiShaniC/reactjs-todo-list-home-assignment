import "normalize.css";
import "./styles.css";
import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { Main } from "./Main";
import { Provider } from 'react-redux'

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <Main />
  </StrictMode>,
  rootElement
);
