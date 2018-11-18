import React from 'react';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

import { BinaryComponentType } from './ShapeDisplay';
import SquareCard from '../ui/SquareCard';

export default function ShapeBinaryComponentCard({ binaryComponent = {} }) {
  if (binaryComponent === undefined) { return null; }
  const { id: binaryComponentId } = binaryComponent;
  return (
    <SquareCard>
      <CardHeader
        disableTypography
        title={<Typography variant="subheading">{`Binary Component - ${binaryComponentId}`}</Typography>}
      />
      <CardContent>
        <BinaryComponentType
          value={binaryComponent}
        />
      </CardContent>
    </SquareCard>
  );
}
