import MonlowDB from 'monlowdb';

export default new MonlowDB({
  file: 'db',
  key: 'ticks',
  schema: {
    buy: undefined,
    exchange: undefined,
    sell: undefined,
    symbol: undefined,
    timestamp: undefined,
    volume: 0,
  },
  // crypto: 'salt',
});
