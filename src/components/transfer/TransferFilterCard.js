import React from 'react';
import CardContent from '@material-ui/core/CardContent';

import SquareCard from '../ui/SquareCard';
import TransferFilter from './TransferFilter';

export default function TransferFilterCard({
  ...props
}) {
  return (
    <SquareCard>
      <CardContent>
        <TransferFilter
          {...props}
        />
      </CardContent>
    </SquareCard>
  );
}
