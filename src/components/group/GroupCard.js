import React from 'react';
import CardContent from '@material-ui/core/CardContent';

import SquareCard from '../ui/SquareCard';
import { GroupBasicDisplay } from './GroupDisplay';

export default function GroupCard({
  ...props
}) {
  return (
    <SquareCard>
      <CardContent>
        <GroupBasicDisplay
          {...props}
        />
      </CardContent>
    </SquareCard>
  );
}
