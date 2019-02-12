import React from 'react';
import CardContent from '@material-ui/core/CardContent';

import SquareCard from '../ui/SquareCard';
import UserKeyTable from './UserKeyTable';

export default function UserKeyCard({
  ...props
}) {
  return (
    <SquareCard>
      <CardContent>
        <UserKeyTable
          {...props}
        />
      </CardContent>
    </SquareCard>
  );
}
