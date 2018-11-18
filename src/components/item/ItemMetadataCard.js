import React from 'react';
import CardContent from '@material-ui/core/CardContent';

import SquareCard from '../ui/SquareCard';
import MetadataDisplay from '../metadata/MetadataDisplay';

export default function ItemMetadataCard({ ...props }) {
  return (
    <SquareCard>
      <CardContent>
        <MetadataDisplay
          {...props}
        />
      </CardContent>
    </SquareCard>
  );
}
