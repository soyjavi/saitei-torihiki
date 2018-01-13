import { Tick } from './store';
import { C, push } from './common';

const { COINS, MIN_PROFIT } = C;

const profit = (floor, value) => (((value * 100) / floor) - 100).toFixed(2);

export default () => {
  const symbols = [];
  Object
    .keys(COINS)
    .forEach(coin => COINS[coin].forEach(pair => symbols.push(`${coin}${pair}`)));

  symbols.forEach((symbol) => {
    const ticks = Tick.find({ query: { symbol }, limit: 0 });

    if (ticks.length === 0) return;

    const from = Tick.find({ query: {
      buy: Math.min.apply(null, ticks.map(({ buy }) => buy)),
    } });
    const to = Tick.find({ query: {
      sell: Math.max.apply(null, ticks.map(({ sell }) => sell)),
    } });
    const bestProfit = profit(from.buy, to.sell);
    if (bestProfit > MIN_PROFIT) push(`${symbol} ${bestProfit}% ${from.exchange} (${from.buy}) <> ${to.exchange} (${to.sell})`);

    console.log(`\n[${symbol}]`);
    console.log(`Buy in ${from.exchange}|${from.buy} and sell in ${to.exchange}|${to.sell} profit ${bestProfit}%`);

    ticks.forEach(({ exchange, buy, sell }) => {
      console.log(` [${exchange} ${buy} | ${sell}]`);
      if (profit(to.sell, buy) > 0) console.log(`   - buy  ${buy} ${profit(to.sell, buy)}`);
      if (profit(from.buy, sell)) console.log(`   - sell ${sell} ${profit(from.buy, sell)}%`);
    });
  });
};
