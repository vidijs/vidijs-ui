import React from 'react';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

import { ShapeSection } from './ShapeDisplay';
import SquareCard from '../ui/SquareCard';

export default function ShapeCard({ shapeDocument = {} }) {
  if (shapeDocument === undefined) { return null; }
  const { id: shapeId } = shapeDocument;
  return (
    <SquareCard>
      <CardHeader
        disableTypography
        title={<Typography variant="subtitle1">{`Shape - ${shapeId}`}</Typography>}
      />
      <CardContent>
        <ShapeSection
          value={shapeDocument}
        />
      </CardContent>
    </SquareCard>
  );
}
