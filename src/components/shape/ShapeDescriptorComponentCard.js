import React from 'react';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

import { DescriptorComponentType } from './ShapeDisplay';
import SquareCard from '../ui/SquareCard';
import ShapeComponentMetadataEditor from './ShapeComponentMetadataEditor';

export default function ShapeDescriptorComponentCard({
  descriptorComponent = {}, itemId, shapeId, onRefresh,
}) {
  if (descriptorComponent === undefined) { return null; }
  const { id: descriptorComponentId, metadata } = descriptorComponent;
  return (
    <SquareCard>
      <CardHeader
        disableTypography
        title={<Typography variant="subtitle1">{`Descriptor Component - ${descriptorComponentId}`}</Typography>}
      />
      <CardContent>
        <DescriptorComponentType
          value={descriptorComponent}
        />
        <ShapeComponentMetadataEditor
          title="Desciptor Component Metadata"
          metadata={metadata}
          onRefresh={onRefresh}
          itemId={itemId}
          shapeId={shapeId}
          componentId={descriptorComponentId}
        />
      </CardContent>
    </SquareCard>
  );
}
