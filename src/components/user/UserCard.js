import React from 'react';
import CardContent from '@material-ui/core/CardContent';

import SquareCard from '../ui/SquareCard';
import { UserBasicDisplay } from './UserDisplay';

export default function UserCard({
  ...props
}) {
  return (
    <SquareCard>
      <CardContent>
        <UserBasicDisplay
          {...props}
        />
      </CardContent>
    </SquareCard>
  );
}
