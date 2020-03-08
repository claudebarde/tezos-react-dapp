import React, { useContext } from "react";
import { Context } from "../../context/Context";

const Navbar = () => {
  const { initTezbridge, userAddress, balance } = useContext(Context);

  const mutezToTez = mutez =>
    Math.round((parseInt(mutez) / 1000000 + Number.EPSILON) * 100) / 100;

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
            {balance && `Balance: ${mutezToTez(balance)} ꜩ`}
          </div>
          <button
            className={`button is-light ${
              !userAddress ? "is-info" : "is-success"
            }`}
            onClick={initTezbridge}
          >
            {!userAddress
              ? "Connect your wallet"
              : userAddress.slice(0, 5) + "..." + userAddress.slice(-5)}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
