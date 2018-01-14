import fetch from 'node-fetch';
import { C } from '../common';
import { Tick } from '../store';
import { getSymbols } from './modules';

const { EXCHANGES: { KRAKEN } } = C;
const URL = 'https://api.kraken.com/0/public/Ticker?pair=';

export default async (timestamp) => {
  const symbols = getSymbols((coin, pair) => `${coin}${pair}`);

  Object.keys(symbols).forEach(async (symbol) => {
    const response = await fetch(`${URL}${symbols[symbol]}`);
    const { result } = await response.json() || {};

    if (response.status === 200 && result) {
      const { a, b, v } = result[Object.keys(result)[0]];
      const tick = Tick.update({
        query: { exchange: KRAKEN, symbol },
        data: {
          buy: parseFloat(b[0], 10),
          sell: parseFloat(a[0], 10),
          timestamp,
          volume: parseInt(v[1], 10),
        },
        upsert: true,
      });
      console.log(`[KRAKEN] ${symbol} ${tick.buy} ${tick.sell}`);
    }
  });
};
