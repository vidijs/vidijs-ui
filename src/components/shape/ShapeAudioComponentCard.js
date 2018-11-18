import React from 'react';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

import { AudioComponentType } from './ShapeDisplay';
import SquareCard from '../ui/SquareCard';

export default function ShapeAudioComponentCard({ audioComponent = {} }) {
  if (audioComponent === undefined) { return null; }
  const { id: audioComponentId } = audioComponent;
  return (
    <SquareCard>
      <CardHeader
        disableTypography
        title={<Typography variant="subheading">{`Audio Component - ${audioComponentId}`}</Typography>}
      />
      <CardContent>
        <AudioComponentType
          value={audioComponent}
        />
      </CardContent>
    </SquareCard>
  );
}
