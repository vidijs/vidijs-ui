import React from 'react';
import CardContent from '@material-ui/core/CardContent';

import SquareCard from '../ui/SquareCard';
import TransferTable from './TransferTable';

export default function TransferCard({
  ...props
}) {
  return (
    <SquareCard>
      <CardContent>
        <TransferTable
          {...props}
        />
      </CardContent>
    </SquareCard>
  );
}
