import { generatePath } from 'react-router-dom';

const itemParams = new URLSearchParams({
  content: 'metadata',
  field: ['title', 'originalFilename'],
  terse: true,
});

export default {
  itemList: (params) => generatePath(`/item/?${itemParams.toString()}`, params),
  item: (params) => generatePath('/item/:itemId}', params),
};
