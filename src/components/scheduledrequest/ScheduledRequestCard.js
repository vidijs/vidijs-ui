import React from 'react';
import CardContent from '@material-ui/core/CardContent';

import SquareCard from '../ui/SquareCard';
import ScheduledRequestTable from './ScheduledRequestTable';

export default ({
  ...props
}) => (
  <SquareCard>
    <CardContent>
      <ScheduledRequestTable
        {...props}
      />
    </CardContent>
  </SquareCard>
);
