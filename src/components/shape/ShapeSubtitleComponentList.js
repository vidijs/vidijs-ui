import React from 'react';

import ShapeSubtitleComponentCard from './ShapeSubtitleComponentCard';

export default function ShapeSubtitleComponentList({ shapeDocument = {} }) {
  const { subtitleComponent: subtitleComponentList } = shapeDocument;
  if (subtitleComponentList === undefined || !Array.isArray(subtitleComponentList)) { return null; }
  return (
    subtitleComponentList.map((subtitleComponent) => (
      <ShapeSubtitleComponentCard
        key={subtitleComponent.id}
        subtitleComponent={subtitleComponent}
      />
    ))
  );
}
