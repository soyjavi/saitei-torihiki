import { C } from '../../common';

const { COINS } = C;

export default (callback) => {
  const pairs = {};
  Object
    .keys(COINS)
    .forEach((coin) => {
      COINS[coin]
        .forEach(pair => pairs[`${coin}${pair}`] = callback(coin, pair)); // eslint-disable-line
    });
  return pairs;
};
