import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";
import "./bulma.css";
import simpleStorage from "../../build/contracts/SimpleStorage.json";

const App = () => {
  const [count, setCount] = useState(undefined);
  const [contractAddress, setContractAddress] = useState(undefined);
  const eztz = window.eztz;

  useEffect(() => {
    (async () => {
      // fetches the address
      const networks = Object.keys(simpleStorage.networks);
      if (networks.length > 0) {
        // saves smart contract storage
        const address = simpleStorage.networks[networks[0]].address;
        setContractAddress(address);
        try {
          await eztz.node.setProvider("http://localhost:8732");
          const storage = await eztz.contract.storage(address);
          setCount(storage.int);
          console.log(storage);
        } catch (error) {
          console.log(error);
        }
      }
    })();
  }, []);

  return (
    <>
      <Navbar />
      <div className="App">
        <header className="App-header">Hello Tezos!</header>
        <div>
          Contract address:{" "}
          {contractAddress === undefined ? "loading..." : contractAddress}
        </div>
        <div>
          Contract Storage Value: {count === undefined ? "loading..." : count}
        </div>
      </div>
    </>
  );
};

export default App;
