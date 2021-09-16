import React from 'react';

import CardList from '../ui/CardList';
import ShapeContainerComponentCard from '../shape/ShapeContainerComponentCard';
import ShapeVideoComponentList from '../shape/ShapeVideoComponentList';
import ShapeDescriptorComponentList from '../shape/ShapeDescriptorComponentList';
import ShapeAudioComponentList from '../shape/ShapeAudioComponentList';
import ShapeBinaryComponentList from '../shape/ShapeBinaryComponentList';
import ShapeSubtitleComponentList from '../shape/ShapeSubtitleComponentList';

export default function FileShapeOverview(props) {
  const { shapeDocument } = props;
  if (shapeDocument === undefined) { return null; }
  return (
    <CardList>
      <ShapeContainerComponentCard {...props} />
      <ShapeVideoComponentList {...props} />
      <ShapeAudioComponentList {...props} />
      <ShapeBinaryComponentList {...props} />
      <ShapeDescriptorComponentList {...props} />
      <ShapeSubtitleComponentList {...props} />
    </CardList>
  );
}
