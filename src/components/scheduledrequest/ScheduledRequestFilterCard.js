import React from 'react';
import CardContent from '@material-ui/core/CardContent';

import SquareCard from '../ui/SquareCard';
import ScheduledRequestFilter from './ScheduledRequestFilter';

export default ({
  ...props
}) => (
  <SquareCard>
    <CardContent>
      <ScheduledRequestFilter
        {...props}
      />
    </CardContent>
  </SquareCard>
);
