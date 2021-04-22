import React from 'react';

import CardList from '../ui/CardList';
import ShapeCard from './ShapeCard';
import ShapeContainerComponentCard from './ShapeContainerComponentCard';
import ShapeVideoComponentList from './ShapeVideoComponentList';
import ShapeDescriptorComponentList from './ShapeDescriptorComponentList';
import ShapeAudioComponentList from './ShapeAudioComponentList';
import ShapeBinaryComponentList from './ShapeBinaryComponentList';
import ShapeSubtitleComponentList from './ShapeSubtitleComponentList';
import ShapeMetadataCard from './ShapeMetadataCard';

export default function ShapeOverview({ shapeDocument = {} }) {
  if (shapeDocument === undefined) { return null; }
  return (
    <CardList>
      <ShapeCard
        shapeDocument={shapeDocument}
      />
      <ShapeContainerComponentCard
        shapeDocument={shapeDocument}
      />
      <ShapeVideoComponentList
        shapeDocument={shapeDocument}
      />
      <ShapeAudioComponentList
        shapeDocument={shapeDocument}
      />
      <ShapeBinaryComponentList
        shapeDocument={shapeDocument}
      />
      <ShapeDescriptorComponentList
        shapeDocument={shapeDocument}
      />
      <ShapeSubtitleComponentList
        shapeDocument={shapeDocument}
      />
      <ShapeMetadataCard
        shapeDocument={shapeDocument}
      />
    </CardList>
  );
}
