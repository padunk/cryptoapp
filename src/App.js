import * as React from "react";
import { hot } from "react-hot-loader/root";
import { API } from "aws-amplify";
import "./App.css";

function App() {
  const [coins, updateCoins] = React.useState([]);
  const [input, updateInput] = React.useState({ limit: 5, start: 0 });
  const [fetchStatus, updateFetchStatus] = React.useState("pending"); // pending, success, error

  function updateInputValues(type, value) {
    updateInput({ ...input, [type]: value });
  }

  async function fetchCoins() {
    updateFetchStatus("pending");

    const { limit, start } = input;
    const data = await API.get(
      "cryptoapi",
      `/coins?limit=${limit}&start=${start}`
    );
    if (data.coins.error) {
      updateFetchStatus("error");
    } else {
      updateFetchStatus("success");
      updateCoins(data.coins);
    }
  }

  React.useEffect(() => {
    fetchCoins();
  }, []);

  return (
    <div>
      <input
        onChange={(e) => updateInputValues("limit", e.target.value)}
        placeholder='limit'
      />
      <input
        placeholder='start'
        onChange={(e) => updateInputValues("start", e.target.value)}
      />
      <button onClick={fetchCoins}>Fetch Coins</button>
      {fetchStatus === "pending" ? (
        <div>Loading</div>
      ) : fetchStatus === "success" ? (
        coins.map((coin, index) => (
          <div key={index}>
            <h2>
              {coin.name} = {coin.symbol}
            </h2>
            <h5>${coin.price_usd}</h5>
          </div>
        ))
      ) : (
        <div>Error</div>
      )}
    </div>
  );
}

export default hot(App);
