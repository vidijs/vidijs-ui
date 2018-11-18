import decodeUrl from './decodeUrl';
import { UNIVERSAL_SCHEME } from '../const/UrlScheme';

const encodeUrl = (props = {}, url) => {
  let urlProps = {};
  if (url) { urlProps = decodeUrl(url); }
  const {
    direct,
    protocol,
    username,
    password,
    host,
    port,
    path,
    queryParams,
  } = { ...urlProps, ...props };
  if (protocol === UNIVERSAL_SCHEME) {
    return 'universal:/';
  }
  let urlString = '';
  if (direct) { urlString = 'direct+'; }
  if (protocol) { urlString = `${urlString}${protocol}://`; }
  if (username) { urlString = `${urlString}${username}@`; }
  if (password && urlString.endsWith('@')) {
    urlString = `${urlString.split('@')[0]}:${password}@`;
  }
  if (host) { urlString = `${urlString}${host}`; }
  if (port) { urlString = `${urlString}:${port}`; }
  if (path) {
    if (path.startsWith('/') || urlString.endsWith('/')) {
      urlString = `${urlString}${path}`;
    } else {
      urlString = `${urlString}/${path}`;
    }
  }
  if (queryParams) {
    const queryParamsHasValue = Object.entries(queryParams).filter(c => c[1] !== '');
    const queryString = queryParamsHasValue.map(c => c.join('=')).join('&');
    if (queryString) {
      urlString = `${urlString}?${queryString}`;
    }
  }
  return urlString;
};

export default encodeUrl;
