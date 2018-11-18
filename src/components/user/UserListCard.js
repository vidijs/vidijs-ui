import React from 'react';
import CardContent from '@material-ui/core/CardContent';

import SquareCard from '../ui/SquareCard';
import UserTable from './UserTable';

export default function UserListCard({
  ...props
}) {
  return (
    <SquareCard>
      <CardContent>
        <UserTable
          {...props}
        />
      </CardContent>
    </SquareCard>
  );
}
