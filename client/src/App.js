import React, { useContext } from "react";
import Navbar from "./components/Navbar/Navbar";
import Main from "./components/Main/Main";
import "./App.css";
import "./bulma.css";
import { Provider } from "./context/Context";

const App = () => {
  return (
    <Provider>
      <Navbar />
      <Main />
    </Provider>
  );
};

export default App;
