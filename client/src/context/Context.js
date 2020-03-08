import React, { useState, useEffect } from "react";
import simpleStorage from "../../../build/contracts/SimpleStorage.json";

const initialState = {
  address: undefined,
  balance: undefined,
  rpcHost: undefined,
  contractAddress: undefined,
  count: 0
};

export const Context = React.createContext({
  state: initialState,
  setState: () => {}
});

export const Provider = props => {
  const [storage, setStorage] = useState(undefined);
  const [userAddress, setUserAddress] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [rpcHost, setRpcHost] = useState(undefined);
  const [contractAddress, setContractAddress] = useState(undefined);

  const { tezbridge, eztz } = window;

  const initTezbridge = async () => {
    // tezbridge
    try {
      // sets rpc host
      let tempHost = "";
      if (process.env.NODE_ENV === "development") {
        tempHost = "http://localhost:8732";
      } else {
        tempHost = "https://mainnet.tezrpc.me";
      }
      const rpc = await tezbridge.request({
        method: "set_host",
        host: tempHost
      });
      if (rpc) setRpcHost(tempHost);
      // gets user's address
      const _address = await tezbridge.request({ method: "get_source" });
      setUserAddress(_address);
      // gets user's balance
      const _balance = await eztz.rpc.getBalance(_address);
      setBalance(_balance);
    } catch (error) {
      console.log("error fetching the address or balance:", error);
    }
  };

  useEffect(() => {
    const { tezbridge, eztz } = window;
    (async () => {
      // fetches the address
      const networks = Object.keys(simpleStorage.networks);
      if (networks.length > 0) {
        // saves smart contract storage
        const _address = simpleStorage.networks[networks[0]].address;
        setContractAddress(_address);
        try {
          await eztz.node.setProvider("http://localhost:8732");
          eztz.contract.watch(_address, 4, storage => {
            setStorage(storage);
          });
        } catch (error) {
          console.log(error.toString());
        }
      }
    })();
  }, []);

  const state = {
    storage,
    userAddress,
    balance,
    rpcHost,
    contractAddress,
    eztz,
    tezbridge,
    initTezbridge
  };

  return <Context.Provider value={state}>{props.children}</Context.Provider>;
};
