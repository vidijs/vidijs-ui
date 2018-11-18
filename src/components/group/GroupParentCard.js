import React from 'react';
import CardContent from '@material-ui/core/CardContent';

import SquareCard from '../ui/SquareCard';
import GroupParentEditor from './GroupParentEditor';

export default function GroupParentCard({
  ...props
}) {
  return (
    <SquareCard>
      <CardContent>
        <GroupParentEditor
          {...props}
        />
      </CardContent>
    </SquareCard>
  );
}
