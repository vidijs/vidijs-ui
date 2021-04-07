import React from 'react';
import GridList from '@material-ui/core/GridList';

import ItemGridListTile from './ItemGridListTile';

export default function ItemListCard({
  itemListDocument,
}) {
  if (itemListDocument === undefined) { return null; }
  const { item: itemList = [] } = itemListDocument;
  return (
    <GridList cellHeight="auto">
      {itemList.map((itemType) => (
        <ItemGridListTile
          key={itemType.id}
          itemType={itemType}
        />
      ))}
    </GridList>
  );
}
