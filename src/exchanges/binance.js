import fetch from 'node-fetch';
import { C } from '../common';
import { Tick } from '../store';
import { getSymbols } from './modules';

const { EXCHANGES: { BINANCE } } = C;
const URL = 'https://api.binance.com/api/v3/ticker/bookTicker?symbol=';

export default async (timestamp) => {
  const symbols = getSymbols((coin, pair) => `${coin}${pair}`.toUpperCase());

  Object.keys(symbols).forEach(async (symbol) => {
    const response = await fetch(`${URL}${symbols[symbol]}`);

    if (response.status === 200) {
      const { bidPrice: buy, askPrice: sell } = await response.json() || {};

      const tick = Tick.update({
        query: { exchange: BINANCE, symbol },
        data: {
          buy: parseFloat(buy, 10),
          sell: parseFloat(sell, 10),
          timestamp,
        },
        upsert: true,
      });
      console.log(`[BINANCE] ${symbol} ${tick.buy} ${tick.sell}`);
    }
  });
};
