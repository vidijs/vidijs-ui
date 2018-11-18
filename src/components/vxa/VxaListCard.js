import React from 'react';
import CardContent from '@material-ui/core/CardContent';

import SquareCard from '../ui/SquareCard';
import VxaListTable from './VxaListTable';

export default function VxaListCard({
  ...props
}) {
  return (
    <SquareCard>
      <CardContent>
        <VxaListTable
          {...props}
        />
      </CardContent>
    </SquareCard>
  );
}
