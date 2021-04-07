// eslint-disable-next-line import/no-extraneous-dependencies
const { createProxyMiddleware } = require('http-proxy-middleware');

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
  app.use(createProxyMiddleware(VIDISPINE_ENDPOINTS, options));
}

module.exports = useProxy;
