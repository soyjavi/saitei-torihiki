import fetch from 'node-fetch';
import { C } from '../common';
import { Tick } from '../store';
import { getSymbols } from './modules';

const { EXCHANGES: { BITSTAMP } } = C;
const URL = 'https://www.bitstamp.net/api/v2/ticker';

export default async (timestamp) => {
  const symbols = getSymbols((coin, pair) => `${coin}${pair}`.toLowerCase());

  Object.keys(symbols).forEach(async (symbol) => {
    const response = await fetch(`${URL}/${symbols[symbol]}`);

    if (response.status === 200) {
      const { volume, bid: buy, ask: sell } = await response.json() || {};

      const tick = Tick.update({
        query: { exchange: BITSTAMP, symbol },
        data: {
          buy: parseFloat(buy, 10),
          sell: parseFloat(sell, 10),
          timestamp,
          volume: parseInt(volume, 10),
        },
        upsert: true,
      });
      console.log(`[BITSTAMP] ${symbol} ${tick.buy} ${tick.sell}`);
    }
  });
};
