import { CronJob } from 'cron';
import exchanges from './exchanges';
import arbitrage from './arbitrage';

const DEFAULTS = {
  runOnInit: false,
  start: true,
  timeZone: 'America/Los_Angeles',
};

export default () => {
  // -- Get Ticks from exchanges
  new CronJob({
    ...DEFAULTS,
    cronTime: '15 */1 * * * *', // - Every minute at second 15"
    onTick: exchanges,
    runOnInit: true,
  });

  // -- @TODO: Arbitrage
  new CronJob({
    ...DEFAULTS,
    cronTime: '45 */1 * * * *', // - Every minute at second 45"
    onTick: arbitrage,
  });

  // -- @TODO: Dispatch alarms
};
