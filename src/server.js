import bodyParser from 'body-parser';
import express from 'express';
import FileSync from 'lowdb/adapters/FileSync';
import low from 'lowdb';
import errorhandler from 'errorhandler';
import PKG from '../package.json';

const app = express();
const orderbook = low(new FileSync('db/orderbook.json'));
orderbook.defaults({ orders: [] }).write();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(errorhandler(() => {
  console.log(`${message} ${error}`);
}));

app.get('/', function (req, res) {
  res.json({
    name: PKG.name,
    version: PKG.version,
    stats: {},
  });
})

app.listen(3000, function () {
  console.log(`${PKG.name} on port 3000!`);
})
