import React from 'react';
import CardContent from '@material-ui/core/CardContent';

import SquareCard from '../ui/SquareCard';
import VxaDisplay from './VxaDisplay';

export default function VxaCard({
  ...props
}) {
  return (
    <SquareCard>
      <CardContent>
        <VxaDisplay
          {...props}
        />
      </CardContent>
    </SquareCard>
  );
}
