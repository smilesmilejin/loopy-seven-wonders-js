const axios = require('axios');

// Be sure to store your API key in a .env file.
// The .env.sample file shows the required format.
// To run this file, we start node from the project root like
// `node --env-file=.env solutions/loopyAsyncAwait.js`
const API_KEY = process.env.api_key;

// Endpoint documentation: https://docs.locationiq.com/reference/search
const BASE_URL = 'https://us1.locationiq.com/v1/search';
const DELAY = 1000;

// more details about the config structure:
// https://github.com/axios/axios#request-config

// This does the same thing as the promise version, but uses async/await syntax.
// We need to remember that even though this code looks synchronous, it is not.
// The return value is actually a Promise that resolves to the final result.
// Note that we could have left this as a promise-based function and used
// the async/await syntax only in the looping function. Promises and async/await
// can be mixed and matched as needed.
const getLatLonForPlace = async (place) => {
  const response = await axios.get(BASE_URL, {
    params: {
      key: API_KEY,
      q: place,
      format: 'json',
    },
  });

  const { lat, lon } = response.data[0];
  return { lat, lon };
};

// more details about the config structure:
// https://github.com/axios/axios#request-config

// wait helper method from MDN Promise documentation
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises#creating_a_promise_around_an_old_callback_api
// wait() returns a Promise that pauses the requested number of ms
// before calling the next callback in the chain

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

// the seven wonders
const wonders = [
  'Great Wall of China',
  'Petra',
  'Colosseum',
  'Chichen Itza',
  'Machu Picchu',
  'Taj Mahal',
  'Christ the Redeemer',
];

// This does the same thing as the promise version, but uses async/await syntax.
// We need to remember that even though this code looks synchronous, it is not.
// The return value is actually a Promise that resolves to the final result.
const getLatLonForPlaces = async (places) => {
  const result = {};

  for (const place of places) {
    const location = await getLatLonForPlace(place);
    result[place] = location;
    await wait(DELAY);  // very easy to miss the await here!
  }

  return result;
};

const main = async () => {
  // With async/await, we use try/catch to handle errors instead of .catch
  try {
    const result = await getLatLonForPlaces(wonders);
    console.log({ result });
  } catch (error) {
    console.log(error);
  }
};

main();
