import React from 'react';
import CardContent from '@material-ui/core/CardContent';

import SquareCard from '../ui/SquareCard';
import {
  JobBasicDisplay,
  JobCurrentDisplay,
  JobDataDisplay,
  JobStepDisplay,
} from './JobDisplay';

export default function JobCard({
  ...props
}) {
  if (props.jobDocument === undefined) { return null; }
  return (
    <React.Fragment>
      <SquareCard>
        <CardContent>
          <JobBasicDisplay
            {...props}
          />
        </CardContent>
      </SquareCard>
      <SquareCard>
        <CardContent>
          <JobCurrentDisplay
            {...props}
          />
        </CardContent>
      </SquareCard>
      <SquareCard>
        <CardContent>
          <JobDataDisplay
            {...props}
          />
        </CardContent>
      </SquareCard>
      <SquareCard>
        <CardContent>
          <JobStepDisplay
            {...props}
          />
        </CardContent>
      </SquareCard>
    </React.Fragment>
  );
}
