import React from 'react';
import CardContent from '@material-ui/core/CardContent';

import SquareCard from '../ui/SquareCard';
import GroupTable from './GroupTable';

export default function GroupListCard({
  ...props
}) {
  return (
    <SquareCard>
      <CardContent>
        <GroupTable
          {...props}
        />
      </CardContent>
    </SquareCard>
  );
}
