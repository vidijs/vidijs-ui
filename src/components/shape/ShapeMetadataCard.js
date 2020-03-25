import React from 'react';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

import { SimpleMetadataType } from './ShapeDisplay';
import SquareCard from '../ui/SquareCard';

export default function ShapeMetadataCard({ shapeDocument = {} }) {
  const { metadata } = shapeDocument;
  if (metadata === undefined) { return null; }
  return (
    <SquareCard>
      <CardHeader
        disableTypography
        title={<Typography variant="subtitle1">Metadata</Typography>}
      />
      <CardContent>
        <SimpleMetadataType
          value={metadata}
        />
      </CardContent>
    </SquareCard>
  );
}
