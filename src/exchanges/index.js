import binance from './binance';
import bitstamp from './bitstamp';
import gdax from './gdax';
import kraken from './kraken';
import kucoin from './kucoin';

export default () => {
  const timestamp = new Date().getTime();
  bitstamp(timestamp);
  binance(timestamp);
  gdax(timestamp);
  kraken(timestamp);
  kucoin(timestamp);
};

