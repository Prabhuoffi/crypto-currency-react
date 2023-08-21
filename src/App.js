import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=INR&order=market_cap_desc&per_page=100&page=1&sparkline=false'
      )
      .then((res) => {
        setCoins(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const formatNumber = (number) => {
    return number ? number.toLocaleString() : 'N/A';
  };

  const formatPercentage = (percentage) => {
    return percentage ? `${percentage.toFixed(2)}%` : 'N/A';
  };

  // Filter the coins based on the search input
  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">Cryptocurrency Table</h1>
        <form action="">
          <input
            type="text"
            className="coin-input"
            placeholder="Search by Coin Name or Symbol"
            onChange={handleChange}
          />
        </form>
      </div>

      {loading ? (
     
        <div className="loading-spinner">Loading...</div>
      ) : (
        <table className="coin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Symbol</th>
              <th>Market Cap (INR)</th>
              <th>Price (INR)</th>
              <th>Price Change (24h)</th>
              <th>Volume (24h)</th>
              <th>Logo</th> 
            </tr>
          </thead>
          <tbody>
            {filteredCoins.map((coin) => (
              <tr key={coin.id}>
                <td>{coin.name}</td>
                <td>{coin.symbol}</td>
                <td>{formatNumber(coin.market_cap)}</td>
                <td>{formatNumber(coin.current_price)}</td>
                <td className={coin.price_change_percentage_24h > 0 ? 'positive-change' : 'negative-change'}>
                  {formatPercentage(coin.price_change_percentage_24h)}
                </td>
                <td>{formatNumber(coin.total_volume)}</td>
                <td><img src={coin.image} alt={`${coin.name} Logo`} width="30" height="30" /></td> 
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
