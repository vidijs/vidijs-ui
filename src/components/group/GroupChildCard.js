import React from 'react';
import CardContent from '@material-ui/core/CardContent';

import SquareCard from '../ui/SquareCard';
import GroupChildEditor from './GroupChildEditor';

export default function GroupChildCard({
  ...props
}) {
  return (
    <SquareCard>
      <CardContent>
        <GroupChildEditor
          {...props}
        />
      </CardContent>
    </SquareCard>
  );
}
