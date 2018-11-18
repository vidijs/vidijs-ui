import React from 'react';
import CardContent from '@material-ui/core/CardContent';

import SquareCard from '../ui/SquareCard';
import GroupUserEditor from './GroupUserEditor';

export default function GroupUserCard({
  ...props
}) {
  return (
    <SquareCard>
      <CardContent>
        <GroupUserEditor
          {...props}
        />
      </CardContent>
    </SquareCard>
  );
}
