const axios = require('axios');

// Be sure to store your API key in a .env file.
// The .env.sample file shows the required format.
// To run this file, we start node from the project root like
// `node --env-file=.env solutions/functionalSingleRequest.js`
const API_KEY = process.env.api_key;

// single location call example
const placeName = 'Great Wall of China';

// Endpoint documentation: https://docs.locationiq.com/reference/search
const BASE_URL = 'https://us1.locationiq.com/v1/search';

// more details about the config structure:
// https://github.com/axios/axios#request-config

// Moves the logic for a single request into a reusable function

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
      // extract the lat and lon from the response data
      const { lat, lon } = response.data[0];

      // This return means that any then function that is chained onto this
      // function will receive an object containing the lat and lon as
      // its input.
      return { lat, lon };
    });
};

// The main function shows how to use the getLatLonForPlace function
const main = () => {
  return getLatLonForPlace(placeName)
    .then(({ lat, lon }) => {
      console.log({ lat, lon });
      return;
    })
    .catch(error => {
      console.log(error);
    });
};

main();
