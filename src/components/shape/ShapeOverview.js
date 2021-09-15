import React from 'react';

import CardList from '../ui/CardList';
import ShapeCard from './ShapeCard';
import ShapeContainerComponentCard from './ShapeContainerComponentCard';
import ShapeVideoComponentList from './ShapeVideoComponentList';
import ShapeDescriptorComponentList from './ShapeDescriptorComponentList';
import ShapeAudioComponentList from './ShapeAudioComponentList';
import ShapeBinaryComponentList from './ShapeBinaryComponentList';
import ShapeSubtitleComponentList from './ShapeSubtitleComponentList';

export default function ShapeOverview(props) {
  const { shapeDocument } = props;
  if (shapeDocument === undefined) { return null; }
  return (
    <CardList>
      <ShapeCard {...props} />
      <ShapeContainerComponentCard {...props} />
      <ShapeVideoComponentList {...props} />
      <ShapeAudioComponentList {...props} />
      <ShapeBinaryComponentList {...props} />
      <ShapeDescriptorComponentList {...props} />
      <ShapeSubtitleComponentList {...props} />
    </CardList>
  );
}
