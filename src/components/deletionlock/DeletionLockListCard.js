import React from 'react';
import CardContent from '@material-ui/core/CardContent';

import SquareCard from '../ui/SquareCard';
import DeletionLockListTable from './DeletionLockListTable';

export default function DeletionLockListCard({
  ...props
}) {
  return (
    <SquareCard>
      <CardContent>
        <DeletionLockListTable
          {...props}
        />
      </CardContent>
    </SquareCard>
  );
}
