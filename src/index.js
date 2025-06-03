const axios = require('axios');

// Be sure to store your API key in a .env file.
// The .env.sample file shows the required format.
// The package.json has been configured to load the .env file
// when using `npm start`.
// To run a script other than this `index.js` file, we need to start node
// from the project root like
// `node --env-file=.env path/to/script.js`
// (This will be useful for running the solutions.)
const API_KEY = process.env.api_key;

// Alternatively, we can use the `dotenv` package to load the .env file
// const dotEnv = require('dotenv');

// dotEnv.config(); // Load variables from .env
// const API_KEY = process.env.API_KEY; // Access the API_KEY from .env file

// single location call example
// const placeName = 'Great Wall of China';
const places = [
  'Great Wall of China',
  'Petra',
  'Colosseum',
  'Chichen Itza',
  'Machu Picchu',
  'Taj Mahal',
  'Christ the Redeemer',
];

// Endpoint documentation: https://docs.locationiq.com/reference/search
const BASE_URL = 'https://us1.locationiq.com/v1/search';

// more details about the config structure:
// https://github.com/axios/axios#request-config

// Make a single API call to retrieve the latitude and longitude of
// the Great Wall of China. We'll use this to form the basis of our
// solutions.

// input: placeName: string
// returns: Promise<Location{}>
const getLatLonForPlace = (placeName) => {
  return axios
    .get(BASE_URL, {
      params: {
        key: API_KEY,
        q: placeName,
        format: 'json',
      },
    })
    .then(response => {
      const { lat, lon } = response.data[0];
      // console.log({ lat, lon });
      return { lat, lon };
    });
};

const wait = (ms) => { return new Promise(resolve => { setTimeout(resolve, ms); }); };

// input: places: string[]
// returns: Promise<Result{}>
const getLatLonForPlaces = async (places) => {
  // result
  const result = {};

  // for each wonder
  for (const place of places) {
    // call api with wonder
    const loc = await getLatLonForPlace(place);
    // add result to final structure
    result[place] = loc;

    await wait(500);
  }

  return result;
};

// returns: Promise<Result{}>
const getLatLonForPlacesPromises = (places) => {
  // result
  const result = {};

  let promise = Promise.resolve();

  // for each wonder
  for (const place of places) {
    // call api with wonder
    promise = promise
      .then(() => {
        return getLatLonForPlace(place);
      })
      .then(loc => {
        // add result to final structure
        result[place] = loc;
        return;
      })
      .then(() => wait(500));
  }

  return promise.then(() => {
    return result;
  });
};

// getLatLonForPlaces(places);

// setTimeout(() => {
//   console.log('bzzt!');
// }, 5000);


// wait(5000)
//   .then(() => {
//     console.log('promise');
//     return;
//   }).catch(() => {});

getLatLonForPlaces(places)
  .then((result) => {
    console.log({ result });
    return;
  })
  .catch(() => {});