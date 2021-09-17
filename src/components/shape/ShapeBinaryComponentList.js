import React from 'react';

import ShapeBinaryComponentCard from './ShapeBinaryComponentCard';

export default function ShapeBinaryComponentList({ shapeDocument = {}, ...props }) {
  const { binaryComponent: binaryComponentList } = shapeDocument;
  if (binaryComponentList === undefined || !Array.isArray(binaryComponentList)) { return null; }
  return (
    binaryComponentList.map((binaryComponent) => (
      <ShapeBinaryComponentCard
        key={binaryComponent.id}
        binaryComponent={binaryComponent}
        {...props}
      />
    ))
  );
}
