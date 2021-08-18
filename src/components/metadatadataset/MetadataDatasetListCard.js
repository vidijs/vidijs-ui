import React from 'react';
import CardContent from '@material-ui/core/CardContent';

import SquareCard from '../ui/SquareCard';
import MetadataDatasetListTable from './MetadataDatasetListTable';

export default function MetadataDatasetListCard({
  ...props
}) {
  return (
    <SquareCard>
      <CardContent>
        <MetadataDatasetListTable
          {...props}
        />
      </CardContent>
    </SquareCard>
  );
}
