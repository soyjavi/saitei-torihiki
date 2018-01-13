import bodyParser from 'body-parser';
import express from 'express';
import errorhandler from 'errorhandler';
import PKG from '../package.json';
import cron from './cron';
import { Tick } from './store';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(errorhandler((message, error) => console.log(`${message} ${error}`)));

app.get('/', (req, res) => {
  res.json({
    name: PKG.name,
    version: PKG.version,
    stats: {},
  });
});

app.get('/ticks', (req, res) => {
  res.json(Tick.find({ limit: 0 }));
});

app.listen(3000, () => {
  cron();
  console.log(`${PKG.name} ${PKG.version} on port 3000!`);
});
