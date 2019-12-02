const {
  parsePage,
  parseShow,
  parseMagnet,
} = require('./parsers');
const https = require('https');
const assert = require('assert');
const cheerio = require('cheerio');

const parseHTML = html => cheerio.load(html);
const readStream = (stream, buffer = '') =>
  new Promise((resolve, reject) => stream
    .on('error', reject)
    .on('data', chunk => buffer += chunk)
    .on('end', () => resolve(buffer)));

const get = (url, options = {}) =>
  new Promise(done => https.get(url, options, done));

const ensureStatusCode = expected => {
  if (!Array.isArray(expected))
    expected = [expected];
  return res => {
    const { statusCode } = res;
    assert.ok(expected.includes(statusCode), `status code must be "${expected}" but actually "${statusCode}"`);
    return res;
  };
}

const www = 'https://www.javbus.com';

/**
 * javbus
 * @param {*} param0 
 */
const javbus = ({ homepage = www } = {}) => {
  return {
    /**
     * page
     * @param {*} n 
     * @param {*} uncensored 
     */
    page(n = 1, uncensored = false) {
      return this.list('/' + [uncensored ? 'uncensored' : null, 'page', n].filter(Boolean).join('/'));
    },
    /**
     * star
     * @param {*} who 
     * @param {*} n 
     * @param {*} uncensored 
     */
    star(who, n, uncensored = false) {
      return this.list('/' + [uncensored ? 'uncensored' : null, 'star', who, n].filter(Boolean).join('/'));
    },
    /**
     * genre
     * @param {*} genre 
     * @param {*} n 
     * @param {*} uncensored 
     */
    genre(genre, n = 1, uncensored = false) {
      return this.list('/' + [uncensored ? 'uncensored' : null, 'genre', genre, n].filter(Boolean).join('/'));
    },
    /**
     * search
     * @param {*} keyword 
     * @param {*} n 
     */
    search(keyword, n = 1) {
      return this.list(`/search/${keyword}/${n}`);
    },
    /**
     * list
     * @param {*} path 
     */
    list(path) {
      return Promise
        .resolve(homepage + path)
        .then(get)
        .then(ensureStatusCode([200, 301]))
        .then(readStream)
        .then(parseHTML)
        .then(parsePage)
    },
    /**
     * show
     * @param {*} id 
     */
    show(id) {
      return Promise
        .resolve(`${homepage}/en/${id}`)
        .then(get)
        .then(ensureStatusCode(200))
        .then(readStream)
        .then(parseHTML)
        .then(parseShow);
    },
    /**
     * magnet
     * @param {*} gid 
     */
    magnet(gid) {
      const headers = { referer: homepage };
      const query = `gid=${gid}&uc=0&lang=en&floor=` + Date.now() % 1e3;
      const url = `${homepage}/ajax/uncledatoolsbyajax.php?${query}`;
      return Promise
        .resolve()
        .then(() => get(url, { headers }))
        .then(ensureStatusCode(200))
        .then(readStream)
        .then(x => parseHTML(`<table>${x}</table>`))
        .then(parseMagnet)
        .then(files => files.filter(x => x.size && x.date))
    }
  };
};

module.exports = javbus;