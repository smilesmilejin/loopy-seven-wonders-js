const axios = require('axios');

// Be sure to store your API key in a .env file.
// The .env.sample file shows the required format.
// To run this file, we start node from the project root like
// `node --env-file=.env solutions/loopyPromise.js`
const API_KEY = process.env.api_key;

// Endpoint documentation: https://docs.locationiq.com/reference/search
const BASE_URL = 'https://us1.locationiq.com/v1/search';
const DELAY = 1000;

// more details about the config structure:
// https://github.com/axios/axios#request-config

const getLatLonForPlace = (place) => {
  return axios
    .get(BASE_URL, {
      params: {
        key: API_KEY,
        q: place,
        format: 'json',
      },
    })
    .then(response => {
      const { lat, lon } = response.data[0];
      return { lat, lon };
    });
};

// wait helper method from MDN Promise documentation
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises#creating_a_promise_around_an_old_callback_api
// wait() returns a Promise that pauses the requested number of ms
// before calling the next callback in the chain

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

// The Promise constructor takes a function that is called with two arguments,
// resolve and reject. The function is expected to call resolve or reject when
// it is done. By having the resolve function called after the timeout, the
// promise will not become resolved until the timeout period has passed,
// allowing the next then function in the chain to be called at the correct
// time. We are only interested in resolving the Promise (since setTimeout can't
// really fail, allowing us to leave off the second parameter due to
// JavaScript's lack of parameter count validation.

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

const getLatLonForPlaces = (places) => {
  // Make a promise to use as the start of the chain. This just makes the start
  // of the list of tasks look like the rest of the list, making the loop
  // easier to write.
  let chain = Promise.resolve();
  const result = {};

  // Loop through each wonder and add a new promise to the chain
  for (const place of places) {
    // for each place, tack on a new task in the promise chain that will get the
    // lat and lon for that place, adding it to our result structure, and then
    // wait for a second before moving on to the next place.
    chain = chain
      .then(() => {
        return getLatLonForPlace(place);
      })
      .then(({ lat, lon }) => {
        result[place] = { lat, lon };
        return wait(DELAY);
      });
  }

  // At this point, we have built the promise chain which look like this:
  //
  // (empty head)->
  // getLatLonForPlace('first place')->update result and wait(1000)->
  // getLatLonForPlace(...)->update result and wait(1000)->
  // (... the rest of the places)->
  // getLatLonForPlace('last place')->update result and wait(1000)

  // As the last step in the chain, we need the result, which will be filled in
  // as the chain runs, to be returned to the caller. Note that we can't just
  // directly return the result object now, because the chain hasn't started
  // running yet (result will still be just the {}). We need to wait until the
  // chain is done before we can return the result. This is why we return the
  // result from the chain's final then function.
  return chain
    .then(() => {
      return result;
    });
};

// The main function shows how to use the getLatLonForPlaces function
const main = () => {
  return getLatLonForPlaces(wonders)
    .then((result) => {
      console.log({ result });
      return;
    })
    .catch(error => {
      console.log(error);
    });
};

main();
