import React from 'react';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

import { AudioComponentType } from './ShapeDisplay';
import SquareCard from '../ui/SquareCard';
import ShapeComponentMetadataEditor from './ShapeComponentMetadataEditor';

export default function ShapeAudioComponentCard({
  audioComponent = {}, itemId, shapeId, onRefresh,
}) {
  if (audioComponent === undefined) { return null; }
  const { id: audioComponentId, metadata } = audioComponent;
  return (
    <SquareCard>
      <CardHeader
        disableTypography
        title={<Typography variant="subtitle1">{`Audio Component - ${audioComponentId}`}</Typography>}
      />
      <CardContent>
        <AudioComponentType
          value={audioComponent}
        />
        <ShapeComponentMetadataEditor
          title="Audio Component Metadata"
          metadata={metadata}
          onRefresh={onRefresh}
          itemId={itemId}
          shapeId={shapeId}
          componentId={audioComponentId}
        />
      </CardContent>
    </SquareCard>
  );
}
