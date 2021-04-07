import React from 'react';

import ItemMetadataCard from './ItemMetadataCard';
import ShapeOverviewList from '../shape/ShapeOverviewList';
import UriListCard from '../ui/UriListCard';

export default function ItemContent({ itemDocument }) {
  if (itemDocument === undefined) { return null; }
  const {
    id: itemId,
    metadata,
    thumbnails,
    posters,
    files,
    shape,
  } = itemDocument;
  return (
    <>
      {metadata && (
        <ItemMetadataCard
          itemId={itemId}
          metadataDocument={metadata}
        />
      )}
      {thumbnails && (
        <UriListCard
          title="Thumbnails"
          uriListDocument={thumbnails}
        />
      )}
      {posters && (
        <UriListCard
          title="Posters"
          uriListDocument={posters}
        />
      )}
      {files && (
        <UriListCard
          title="Files"
          uriListDocument={files}
        />
      )}
      {shape && (
        <ShapeOverviewList
          itemId={itemId}
          shapeList={shape}
        />
      )}
    </>
  );
}
