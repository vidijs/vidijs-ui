import React from 'react';
import CardContent from '@material-ui/core/CardContent';

import SquareCard from '../ui/SquareCard';
import MetadataFieldListTable from './MetadataFieldListTable';

export default function MetadataFieldListCard({
  ...props
}) {
  return (
    <SquareCard>
      <CardContent>
        <MetadataFieldListTable
          {...props}
        />
      </CardContent>
    </SquareCard>
  );
}
