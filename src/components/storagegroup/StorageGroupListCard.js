import React from 'react';
import CardContent from '@material-ui/core/CardContent';

import SquareCard from '../ui/SquareCard';
import StorageGroupListTable from './StorageGroupListTable';

export default function StorageGroupListCard({
  storageGroupListDocument,
}) {
  return (
    <SquareCard>
      <CardContent>
        <StorageGroupListTable
          storageGroupListDocument={storageGroupListDocument}
        />
      </CardContent>
    </SquareCard>
  );
}
