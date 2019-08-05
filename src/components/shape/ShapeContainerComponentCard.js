import React from 'react';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

import { ContainerComponentType } from './ShapeDisplay';
import SquareCard from '../ui/SquareCard';

export default function ShapeContainerComponentCard({ shapeDocument = {} }) {
  const { containerComponent } = shapeDocument;
  if (containerComponent === undefined) { return null; }
  const { id: containerComponentId } = containerComponent;
  return (
    <SquareCard>
      <CardHeader
        disableTypography
        title={<Typography variant="subtitle1">{`Container Component - ${containerComponentId}`}</Typography>}
      />
      <CardContent>
        <ContainerComponentType
          value={containerComponent}
        />
      </CardContent>
    </SquareCard>
  );
}
