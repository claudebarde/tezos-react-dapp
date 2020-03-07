import React from "react";

const Navbar = props => {
  const {
    userAddress,
    setUserAddress,
    userBalance,
    setUserBalance,
    tezbridge,
    eztz
  } = props;

  const initTezbridge = async () => {
    // tezbridge
    try {
      // sets rpc host
      let host = "";
      if (process.env.NODE_ENV === "development") {
        host = "http://localhost:8732";
      } else {
        host = "https://mainnet.tezrpc.me";
      }
      const rpc = await tezbridge.request({
        method: "set_host",
        host
      });
      console.log(rpc);
      // gets user's address
      const address = await tezbridge.request({ method: "get_source" });
      setUserAddress(address);
      // gets user's balance
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
