import React from 'react';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

import { VideoComponentType } from './ShapeDisplay';
import SquareCard from '../ui/SquareCard';
import ShapeComponentMetadataEditor from './ShapeComponentMetadataEditor';

export default function ShapeVideoComponentCard({
  videoComponent = {}, itemId, shapeId, onRefresh,
}) {
  if (videoComponent === undefined) { return null; }
  const { id: videoComponentId, metadata } = videoComponent;
  return (
    <SquareCard>
      <CardHeader
        disableTypography
        title={<Typography variant="subtitle1">{`Video Component - ${videoComponentId}`}</Typography>}
      />
      <CardContent>
        <VideoComponentType
          value={videoComponent}
        />
        <ShapeComponentMetadataEditor
          title="Video Component Metadata"
          metadata={metadata}
          onRefresh={onRefresh}
          itemId={itemId}
          shapeId={shapeId}
          componentId={videoComponentId}
        />
      </CardContent>
    </SquareCard>
  );
}
