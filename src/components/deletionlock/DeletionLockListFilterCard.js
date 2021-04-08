import React from 'react';
import CardContent from '@material-ui/core/CardContent';

import SquareCard from '../ui/SquareCard';
import DeletionLockListFilter from './DeletionLockListFilter';

export default function DeletionLockListFilterCard({
  ...props
}) {
  return (
    <SquareCard>
      <CardContent>
        <DeletionLockListFilter
          {...props}
        />
      </CardContent>
    </SquareCard>
  );
}
