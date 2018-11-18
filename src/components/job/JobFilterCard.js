import React from 'react';
import CardContent from '@material-ui/core/CardContent';

import SquareCard from '../ui/SquareCard';
import JobFilter from './JobFilter';

export default function JobFilterCard({
  ...props
}) {
  return (
    <SquareCard>
      <CardContent>
        <JobFilter
          {...props}
        />
      </CardContent>
    </SquareCard>
  );
}
