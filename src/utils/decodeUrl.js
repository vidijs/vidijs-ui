const decodeUrl = (urlString = '') => {
  if (urlString === 'universal:/') {
    return {
      href: urlString,
      protocol: 'universal',
    };
  }
  let direct = false;
  let url = urlString;
  if (urlString.startsWith('direct+')) {
    direct = true;
    url = url.replace('direct+', '');
  }
  const re = /(?:([^:]*):\/\/)?(?:([^:@]*)(?::([^@]*))?@)?(?:([^/:]*)\.(?=[^./:]*\.[^./:]*))?([^./:]*)(?:\.([^/.:]*))?(?::([0-9]*))?(\/[^?#]*(?=.*?\/)\/)?([^?#]*)?(?:\?([^#]*))?(?:#(.*))?/;
  const [
    href,
    protocol,
    username,
    password,
    subdomain,
    domain,
    tld,
    port,
    path,
    file,
    queryString,
    hash,
  ] = re.exec(url);

  let host;
  if (subdomain === '') {
    host = `${host}.`;
  } else if (subdomain !== undefined) { host = `${subdomain}.`; }
  if (domain) { host = `${host || ''}${domain}`; }
  if (tld === '') {
    host = `${host}.`;
  } else if (tld !== undefined) { host = `${host}.${tld}`; }

  let queryParams = {};
  if (queryString) {
    queryParams = queryString.split('&').map(p => p.split('=')).reduce((i, e) => ({ ...i, [e[0]]: e[1] }), {});
  }
  const fullPath = `${path || ''}${(file && file !== '/') ? file : ''}`;
  return {
    href,
    protocol,
    username,
    password,
    port,
    path: fullPath || undefined,
    file,
    hash,
    host,
    queryParams,
    subdomain,
    domain,
    tld,
    direct,
  };
};

export default decodeUrl;
