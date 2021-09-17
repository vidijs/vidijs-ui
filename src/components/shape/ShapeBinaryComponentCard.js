import React from 'react';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

import { BinaryComponentType } from './ShapeDisplay';
import SquareCard from '../ui/SquareCard';
import ShapeComponentMetadataEditor from './ShapeComponentMetadataEditor';

export default function ShapeBinaryComponentCard({
  binaryComponent = {}, itemId, shapeId, onRefresh,
}) {
  if (binaryComponent === undefined) { return null; }
  const { id: binaryComponentId, metadata } = binaryComponent;
  return (
    <SquareCard>
      <CardHeader
        disableTypography
        title={binaryComponentId ? <Typography variant="subtitle1">{`Binary Component - ${binaryComponentId}`}</Typography> : undefined}
      />
      <CardContent>
        <BinaryComponentType
          value={binaryComponent}
        />
        <ShapeComponentMetadataEditor
          title="Binary Component Metadata"
          metadata={metadata}
          onRefresh={onRefresh}
          itemId={itemId}
          shapeId={shapeId}
          componentId={binaryComponentId}
        />
      </CardContent>
    </SquareCard>
  );
}
