export const setQueryParams = (queryParams) => {
  const paramKeys = Object.keys(queryParams);
  if (paramKeys.length === 0) return '';

  const reducer = (accumulator, currentKey, currentIndex) => {
    if (typeof queryParams[currentKey] === 'undefined') {
      return accumulator;
    }
    const separator = currentIndex > 0 ? '&' : '';
    return `${accumulator}${separator}${currentKey}=${queryParams[currentKey]}`;
  };
  const paramStr = paramKeys.reduce(reducer, '?');
  return paramStr;
};

export const onGetStitch = (form) => {
  const urlBase = '/APInoauth/stitch/';
  const { queryParams: allQueryParams } = form;
  const { uri, ...queryParams } = allQueryParams;
  const uriString = uri.reduce(
    (a, c, i) => {
      const separator = i > 0 ? '&' : '';
      return `${a}${separator}uri=${encodeURIComponent(c)}`;
    },
    '',
  );
  const qpString = setQueryParams(queryParams);
  const url = `${urlBase}${qpString || '?'}&${uriString}`;
  return url;
};
