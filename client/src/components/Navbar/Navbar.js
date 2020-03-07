import React, { useEffect, useState } from "react";

const Navbar = props => {
  const {
    userAddress,
    setUserAddress,
    userBalance,
    setUserBalance,
    tezbridge
  } = props;
  const eztz = window.eztz;

  const initTezbridge = async () => {
    // tezbridge
    try {
      const address = await tezbridge.request({ method: "get_source" });
      setUserAddress(address);
      const balance = await eztz.rpc.getBalance(address);
      setUserBalance(balance);
    } catch (error) {
      console.log("error fetching the address or balance:", error);
    }
  };

  return (
    <nav className="navbar is-fixed-top" style={{ paddingTop: "30px" }}>
      <div className="navbar-brand">
        <a className="navbar-item" href="https://bulma.io">
          Tezos Dapp
        </a>
      </div>
      <div className="navbar-end">
        <div className="navbar-item">
          <div className="nav__balance">
            {userBalance && `Balance: ${userBalance} µꜩ`}
          </div>
          <button className="button is-info is-light" onClick={initTezbridge}>
            {userAddress === undefined
              ? "Connect your wallet"
              : userAddress.slice(0, 5) + "..." + userAddress.slice(-5)}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
