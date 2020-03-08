import React, { useContext } from "react";
import { Context } from "../../context/Context";

const Main = () => {
  const { rpcHost, userAddress, contractAddress, storage } = useContext(
    Context
  );

  const { tezbridge } = window;

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

  return (
    <div className="App">
      <header className="App-header">Hello Tezos!</header>
      <div>
        Contract address:{" "}
        {contractAddress === undefined ? "loading..." : contractAddress}
      </div>
      <div>
        {rpcHost
          ? `Connected to ${rpcHost}`
          : "Please connect your wallet and approve RPC host in Tezbridge"}
      </div>
      <div>
        Contract Storage Value:{" "}
        <strong>{storage === undefined ? "loading..." : storage.int}</strong>
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
  );
};

export default Main;
