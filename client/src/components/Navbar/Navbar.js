import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar is-fixed-top">
      <div className="navbar-brand">
        <a className="navbar-item" href="https://bulma.io">
          Tezos Dapp
        </a>
      </div>
      <div className="navbar-end">
        <div className="navbar-item">
          <button className="button is-info is-light">
            Connect your wallet
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
