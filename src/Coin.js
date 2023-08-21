import React from 'react';

function Coin({ name, image, symbol, marketcap, price, pricechange, logo }) {
  const formattedMarketcap = marketcap ? marketcap.toLocaleString() : 'N/A';
  const formattedPrice = price ? price.toLocaleString() : 'N/A';


  return (
    <div className="coin-container">
      <div className="coin-row">
        <div className="coin">
          <img src={image} alt={name} />
          <h1>{name}</h1>
          <p className="coin-symbol">{symbol}</p>
        </div>
        <div className="coin-data">
          <p className="coin-price">Price: ₹{formattedPrice}</p>
          <p className="coin-marketcap">
            Market Cap: ₹{formattedMarketcap}
          </p>
          <p className={`coin-percent ${pricechange < 0 ? 'red' : 'green'}`}>
            {pricechange}%
          </p>
        </div>
        <div className="coin-logo">
          <img src={logo} alt={`${name} Logo`} />
        </div>
      </div>
    </div>
  );
}

export default Coin;
