import React from 'react';

import MetadataCollectionTable from '../collection/MetadataCollectionTable';

export default function ItemCollectionTable({ metadataListDocument, ...props }) {
  if (metadataListDocument === undefined) { return null; }
  const { item: itemList = [] } = metadataListDocument;
  if (itemList.length !== 1) { return null; }
  const thisItem = itemList[0] || {};
  const { metadata: metadataDocument = {} } = thisItem;
  return (
    <MetadataCollectionTable
      metadataDocument={metadataDocument}
      {...props}
    />
  );
}
