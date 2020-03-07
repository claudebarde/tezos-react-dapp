import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";
import "./bulma.css";
import simpleStorage from "../../build/contracts/SimpleStorage.json";

const App = () => {
  const [count, setCount] = useState(undefined);
  const [contractAddress, setContractAddress] = useState(undefined);
  const [userAddress, setUserAddress] = useState(undefined);
  const [userBalance, setUserBalance] = useState(undefined);
  const eztz = window.eztz;
  const tezbridge = window.tezbridge;

  const increment = async () => {
    try {
      const result = await tezbridge.request({
        method: "inject_operations",
        operations: [
          {
            kind: "transaction",
            destination: contractAddress,
            amount: "0",
            parameters: {
              entrypoint: "increment",
              value: { int: "1" }
            }
          }
        ]
      });
      console.log(result);
    } catch (error) {
      console.log("error:", error);
    }
  };

  const decrement = async () => {
    try {
      const result = await tezbridge.request({
        method: "inject_operations",
        operations: [
          {
            kind: "transaction",
            destination: contractAddress,
            amount: "0",
            parameters: {
              entrypoint: "decrement",
              value: { int: "1" }
            }
          }
        ]
      });
      console.log(result);
    } catch (error) {
      console.log("error:", error);
    }
  };

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
          eztz.contract.watch(address, 4, storage => {
            setCount(storage.int);
            console.log(storage);
          });
        } catch (error) {
          console.log(error.toString());
        }
      }
    })();
  }, []);

  return (
    <>
      <Navbar
        userAddress={userAddress}
        setUserAddress={setUserAddress}
        userBalance={userBalance}
        setUserBalance={setUserBalance}
        tezbridge={tezbridge}
      />
      <div className="App">
        <header className="App-header">Hello Tezos!</header>
        <div>
          Contract address:{" "}
          {contractAddress === undefined ? "loading..." : contractAddress}
        </div>
        <div>
          Contract Storage Value:{" "}
          <strong>{count === undefined ? "loading..." : count}</strong>
        </div>
        <br />
        {userAddress && (
          <div className="field is-grouped">
            <p className="control">
              <button className="button is-success" onClick={increment}>
                Increment
              </button>
            </p>
            <p className="control">
              <button className="button is-danger" onClick={decrement}>
                Decrement
              </button>
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default App;
