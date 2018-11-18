import React from 'react';
import CardContent from '@material-ui/core/CardContent';

import SquareCard from '../ui/SquareCard';
import JobListTable from './JobListTable';

export default function JobListCard({
  ...props
}) {
  if (props.jobListDocument === undefined) { return null; }
  return (
    <SquareCard>
      <CardContent>
        <JobListTable
          {...props}
        />
      </CardContent>
    </SquareCard>
  );
}
