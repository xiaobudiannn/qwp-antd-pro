const { _ } = require('lodash');
const mocks = require('./services');
const { settings } = require('./app');
const {
  NOTFOUND,
} = require('./common');

const moduleMaps = {
  '/system/user/users': 'user',
  '/system/org': 'org',
  '/sample/profile/books': 'books',
  /* moduleMaps */
}

function mockFns(req, res) {
  const op = req.query.op;
  let m = req.query.m;
  let fn = false;
  
  if (m && moduleMaps[m]) m = moduleMaps[m];
  if (m && mocks[m]) {
    if (op) {
      if (mocks[m].ops && mocks[m].ops[op]) {
        fn = mocks[m].ops[op];
      } else if (mocks[m].useHome) {
        fn = mocks[m]['/'];
      }
    } else if (mocks[m]['/']) {
      fn = mocks[m]['/'];
    }
  } else if ((!m || m === '/') && op === '$') {
    fn = settings;
  }
  if (fn) {
    if (_.isFunction(fn)) fn(req, res);
    else res.json(fn);
  } else {
    res.status(400).end(JSON.stringify(NOTFOUND));
  }
}

export function setupMocks(services) {
  if (!services.get) services.get = {};
  if (!services.post) services.post = {};
  services.get._mock = mockFns;
  services.post._mock = mockFns;
}

export function setupExpressMocks(app) {
  app.get('/_mock', mockFns);
  app.post('/_mock', mockFns);
}
