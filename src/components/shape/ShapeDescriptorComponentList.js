import React from 'react';

import ShapeDescriptorComponentCard from './ShapeDescriptorComponentCard';

export default function ShapeDescriptorComponentList({ shapeDocument = {}, ...props }) {
  const { descriptorComponent: descriptorComponentList } = shapeDocument;
  if (descriptorComponentList === undefined || !Array.isArray(descriptorComponentList)) {
    return null;
  }
  return (
    descriptorComponentList.map((descriptorComponent) => (
      <ShapeDescriptorComponentCard
        key={descriptorComponent.id}
        descriptorComponent={descriptorComponent}
        {...props}
      />
    ))
  );
}
