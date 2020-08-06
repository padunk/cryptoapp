import * as React from "react";
import { hot } from "react-hot-loader/root";
import { API } from "aws-amplify";
import "./App.css";

function App() {
  const [coins, updateCoins] = React.useState([]);

  async function fetchCoins() {
    const data = await API.get("cryptoapi", "/coins");
    updateCoins(data.coins);
  }

  React.useEffect(() => {
    fetchCoins();
  }, []);

  return (
    <div>
      {coins.map((coin, index) => (
        <div key={index}>
          <h2>
            {coin.name} = {coin.symbol}
          </h2>
          <h5>${coin.price_usd}</h5>
        </div>
      ))}
    </div>
  );
}

export default hot(App);
