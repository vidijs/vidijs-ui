import React from 'react';

import ShapeAudioComponentCard from './ShapeAudioComponentCard';

export default function ShapeAudioComponentList({ shapeDocument = {}, ...props }) {
  const { audioComponent: audioComponentList } = shapeDocument;
  if (audioComponentList === undefined || !Array.isArray(audioComponentList)) { return null; }
  return (
    audioComponentList.map((audioComponent) => (
      <ShapeAudioComponentCard
        key={audioComponent.id}
        audioComponent={audioComponent}
        {...props}
      />
    ))
  );
}
