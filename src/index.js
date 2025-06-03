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
const placeName = 'Great Wall of China';

// Endpoint documentation: https://docs.locationiq.com/reference/search
const BASE_URL = 'https://us1.locationiq.com/v1/search';

// more details about the config structure:
// https://github.com/axios/axios#request-config

// Make a single API call to retrieve the latitude and longitude of
// the Great Wall of China. We'll use this to form the basis of our
// solutions.

const places = [
  'Great Wall of China',
  'Petra',
  'Colosseum',
  'Chichen Itza',
  'Machu Picchu',
  'Taj Mahal',
  'Christ the Redeemer',
];


// Make it as a function
// input: placeName: string
// returns: Promise <location{}>
const getLatLongForPlace = (placeName) => {
  return (axios
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
      // return;  // as configured, eslint requires a return statement
      return {lat, lon};
    })
    .catch(error => {
      console.log(error);
    }));
};

// getLatLongForPlace('placeName'); // { lat: '61.2089599', lon: '-149.7313413' }

// { lat: '61.2089599', lon: '-149.7313413' }
// { input: undefined }
// need to change to return {lat, lon} to get ride of undefined
getLatLongForPlace('placeName')
  .then((input) => {
    console.log({input});
    return;
  })
  .catch(() => {});

// // Python old code
// // code run 5000 secondes later

// Method 1
// setTimeout(() => {
//   console.log('bzzt!');
// }, 5000);

// Method 2
const wait = (ms) => {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
};

wait(5000)
  .then(() => {
    console.log('promise');
    return;
  })
  .catch(()=> {});


// input: places, string[]
// returns: Promise <result>
// const getLatLonForPlaces = (places) => {
//   const result = {};

//   for (const place of places) {
//     // call api with wonder
//     const loc = getLatLongForPlace(place);

//     // add result to final structure
//     result[place] = loc;

//     // sleep(500)
//     wait(500);
//   }
//   return result;
// };

// //########################### Method 1 Promise Chain
// const getLatLonForPlaces = (places) => {
//   const result = {};

//   // Promise.resolve() returns a Promise object that is already resolved with the value undefined.
//   // Start a Promise chain.
//   // Ensure that a piece of code runs asynchronously.  
//   let promise = Promise.resolve();

//   for (const place of places) {
//     // call api with wonder
//     promise = promise
//       .then(() => {
//         return getLatLongForPlace(place);
//       })
//       .then(loc => {
//         // add result to final structure
//         result[place] = loc;
//         return;
//       })
//       .then(() => wait(500));
//   }
//   // it returns a Promise that resolves to result once all prior .then() steps have completed.
//   return promise.then(() => {
//     return result;
//   });
// };


// getLatLonForPlaces(places)
//   .then((result) => {
//     console.log({result});
//     return;
//   })
//   .catch(() =>{});
// // {
// //   result: {
// //     'Great Wall of China': { lat: '40.3622879', lon: '116.0170592' },
// //     Petra: { lat: '30.3258363', lon: '35.4745669' },
// //     Colosseum: { lat: '41.8909705', lon: '12.4922415' },
// //     'Chichen Itza': { lat: '34.4085274', lon: '-118.4282402' },
// //     'Machu Picchu': { lat: '-13.164421950000001', lon: '-72.54508510173372' },
// //     'Taj Mahal': { lat: '27.1750075', lon: '78.04210126365584' },
// //     'Christ the Redeemer': { lat: '-22.9519173', lon: '-43.2104585' }
// //   }
// // }

// //########################### End Method 1 Promise Chain


// //########################### Method 2 async function
const getLatLonForPlaces = async (places) => {
  const result = {};

  for (const place of places) {
    // call api with wonder
    const loc = await getLatLongForPlace(place);
    result[place] = loc;
    await wait(500);
  }

  return result;
  ;
};


getLatLonForPlaces(places)
  .then((result) => {
    console.log({result});
    return;
  })
  .catch(() =>{});


//   {
//   result: {
//     'Great Wall of China': { lat: '40.3622879', lon: '116.0170592' },
//     Petra: { lat: '30.3258363', lon: '35.4745669' },
//     Colosseum: { lat: '41.8909705', lon: '12.4922415' },
//     'Chichen Itza': { lat: '34.4085274', lon: '-118.4282402' },
//     'Machu Picchu': { lat: '-13.164421950000001', lon: '-72.54508510173372' },
//     'Taj Mahal': { lat: '27.1750075', lon: '78.04210126365584' },
//     'Christ the Redeemer': { lat: '-22.9519173', lon: '-43.2104585' }
//   }
// }
// promise