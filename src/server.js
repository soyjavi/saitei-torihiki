import bodyParser from 'body-parser';
import express from 'express';
import errorhandler from 'errorhandler';
import binance from './exchanges/binance';
import bitstamp from './exchanges/bitstamp';
import kucoin from './exchanges/kucoin';
import gdax from './exchanges/gdax';
import PKG from '../package.json';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(errorhandler((message, error) => console.log(`${message} ${error}`)));

const timestamp = new Date().getTime();
bitstamp(timestamp);
binance(timestamp);
kucoin(timestamp);
gdax(timestamp);

app.get('/', (req, res) => {
  res.json({
    name: PKG.name,
    version: PKG.version,
    stats: {},
  });
});

app.listen(3000, () => console.log(`${PKG.name} on port 3000!`));
