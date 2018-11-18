import React from 'react';
import CardContent from '@material-ui/core/CardContent';

import SquareCard from '../ui/SquareCard';
import DocumentMetadataListTable from './DocumentMetadataListTable';

export default function DocumentMetadataListCard({ ...props }) {
  return (
    <SquareCard>
      <CardContent>
        <DocumentMetadataListTable
          {...props}
        />
      </CardContent>
    </SquareCard>
  );
}
