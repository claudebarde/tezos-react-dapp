import React from "react";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";
import "./bulma.css";
import simpleStorage from "../../build/contracts/SimpleStorage.json";

const App = () => {
  if (simpleStorage.networks) {
    const networks = Object.keys(simpleStorage.networks);
    if (networks.length > 0) {
      return (
        <>
          <Navbar />
          <div className="App">
            <header className="App-header">Hello Tezos!</header>
            <div>
              Contract address: {simpleStorage.networks[networks[0]].address}
            </div>
          </div>
        </>
      );
    } else {
      return (
        <>
          <Navbar />
          <div>No network name available!</div>
          <div>If you haven't done, compile first the contracts.</div>
        </>
      );
    }
  } else {
    return (
      <>
        <Navbar />
        <div>The networks info in the JSON file could not be found!</div>
        <div>If you haven't done, compile first the contracts.</div>
      </>
    );
  }
};

export default App;
