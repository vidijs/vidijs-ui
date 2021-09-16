import React from 'react';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

import { ContainerComponentType } from './ShapeDisplay';
import SquareCard from '../ui/SquareCard';
import ShapeComponentMetadataEditor from './ShapeComponentMetadataEditor';

export default function ShapeContainerComponentCard({
  shapeDocument = {}, itemId, shapeId, onRefresh,
}) {
  const { containerComponent } = shapeDocument;
  if (containerComponent === undefined) { return null; }
  const { id: containerComponentId, metadata } = containerComponent;
  return (
    <SquareCard>
      <CardHeader
        disableTypography
        title={containerComponentId ? <Typography variant="subtitle1">{`Container Component - ${containerComponentId}`}</Typography> : undefined}
      />
      <CardContent>
        <ContainerComponentType
          value={containerComponent}
        />
        <ShapeComponentMetadataEditor
          title="Container Component Metadata"
          metadata={metadata}
          onRefresh={onRefresh}
          itemId={itemId}
          shapeId={shapeId}
          componentId={containerComponentId}
        />
      </CardContent>
    </SquareCard>
  );
}
