import React from 'react';
import CardContent from '@material-ui/core/CardContent';

import SquareCard from '../ui/SquareCard';
import UserGroupEditor from './UserGroupEditor';

export default function UserGroupCard({
  ...props
}) {
  return (
    <SquareCard>
      <CardContent>
        <UserGroupEditor
          {...props}
        />
      </CardContent>
    </SquareCard>
  );
}
