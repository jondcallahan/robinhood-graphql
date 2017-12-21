import fetch from 'node-fetch';
const debug = require('debug')('App:fetchDataFromUrl');

export default async (url, options) => {
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (e) {
    debug(e);
    throw new Error(e);
  }
  // TODO: Implement error handling !!
};
