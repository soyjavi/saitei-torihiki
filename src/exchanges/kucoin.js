import fetch from 'node-fetch';
import { C } from '../common';
import { Tick } from '../store';
import { getSymbols } from './modules';

const { EXCHANGES: { KUCOIN } } = C;
const URL = 'https://api.kucoin.com/v1/open/tick?symbol=';

export default async (orderbook, timestamp) => {
  const symbols = getSymbols((coin, pair) => `${coin}-${pair}`.toUpperCase());

  Object.keys(symbols).forEach(async (symbol) => {
    const response = await fetch(`${URL}${symbols[symbol]}`);

    if (response.status === 200) {
      const {
        data: {
          buy, sell, volValue: volume,
      } } = await response.json() || {};

      const tick = Tick.update({
        query: { exchange: KUCOIN, symbol },
        data: {
          buy: parseFloat(buy, 10),
          sell: parseFloat(sell, 10),
          timestamp,
          volume,
        },
        upsert: true,
      });
      console.log(`[KUCOIN] ${symbol} ${tick.buy} ${tick.sell}`);
    }
  });
};
