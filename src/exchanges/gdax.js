import fetch from 'node-fetch';
import { C } from '../common';
import { Tick } from '../store';
import { getSymbols } from './modules';

const { EXCHANGES: { GDAX } } = C;
const URL = 'https://api.gdax.com/products';

export default async (orderbook, timestamp) => {
  const symbols = getSymbols((coin, pair) => `${coin}-${pair}`.toUpperCase());

  Object.keys(symbols).forEach(async (symbol) => {
    const response = await fetch(`${URL}/${symbols[symbol]}/ticker`);

    if (response.status === 200) {
      const { bid: buy, ask: sell, volume } = await response.json() || {};

      const tick = Tick.update({
        query: { exchange: GDAX, symbol },
        data: {
          buy: parseFloat(buy, 10),
          sell: parseFloat(sell, 10),
          timestamp,
          volume,
        },
        upsert: true,
      });
      console.log('>GDAX>', tick);
    }
  });
};
