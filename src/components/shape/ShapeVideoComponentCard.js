import React from 'react';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

import { VideoComponentType } from './ShapeDisplay';
import SquareCard from '../ui/SquareCard';

export default function ShapeVideoComponentCard({ videoComponent = {} }) {
  if (videoComponent === undefined) { return null; }
  const { id: videoComponentId } = videoComponent;
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
      </CardContent>
    </SquareCard>
  );
}
