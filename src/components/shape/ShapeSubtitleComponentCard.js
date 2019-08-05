import React from 'react';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

import { SubtitleComponentType } from './ShapeDisplay';
import SquareCard from '../ui/SquareCard';

export default function ShapeSubtitleComponentCard({ subtitleComponent = {} }) {
  if (subtitleComponent === undefined) { return null; }
  const { id: subtitleComponentId } = subtitleComponent;
  return (
    <SquareCard>
      <CardHeader
        disableTypography
        title={<Typography variant="subtitle1">{`Subtitle Component - ${subtitleComponentId}`}</Typography>}
      />
      <CardContent>
        <SubtitleComponentType
          value={subtitleComponent}
        />
      </CardContent>
    </SquareCard>
  );
}
