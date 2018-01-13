import fetch from 'node-fetch';

const { EXPO_TOKEN } = process.env;

export default async (body, data = {}) => {
  if (!EXPO_TOKEN) return {};

  const { status, statusText } = await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-Encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify([{
      to: `ExponentPushToken[${EXPO_TOKEN}]`,
      sound: 'default',
      body,
      data,
    }]),
  });

  return { status, statusText };
};
