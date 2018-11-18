const proxy = require('http-proxy-middleware');

const VIDISPINE_ENDPOINTS = [
  '/API/',
  '/APInoauth/',
  '/APIinit/',
  '/APIdoc/',
  '/UploadLicense/',
];

const target = process.env.REACT_APP_VIDISPINE_URL || 'http://localhost:8080/';

const options = { target, changeOrigin: true };

function useProxy(app) {
  app.use(proxy(VIDISPINE_ENDPOINTS, options));
}

module.exports = useProxy;
