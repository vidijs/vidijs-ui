import React from 'react';

import ShapeVideoComponentCard from './ShapeVideoComponentCard';

export default function ShapeVideoComponentList({ shapeDocument = {} }) {
  const { videoComponent: videoComponentList } = shapeDocument;
  if (videoComponentList === undefined || !Array.isArray(videoComponentList)) { return null; }
  return (
    videoComponentList.map((videoComponent) => (
      <ShapeVideoComponentCard
        key={videoComponent.id}
        videoComponent={videoComponent}
      />
    ))
  );
}
