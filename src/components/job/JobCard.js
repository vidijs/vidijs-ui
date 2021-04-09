import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';

import CardList from '../ui/CardList';
import {
  JobBasicDisplay,
  JobCurrentDisplay,
  JobDataDisplay,
  JobStepDisplay,
} from './JobDisplay';

export default function JobCard({ ...props }) {
  if (props.jobDocument === undefined) { return null; }
  return (
    <CardList>
      <Card>
        <CardContent>
          <JobBasicDisplay
            {...props}
          />
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <JobCurrentDisplay
            {...props}
          />
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <JobDataDisplay
            {...props}
          />
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <JobStepDisplay
            {...props}
          />
        </CardContent>
      </Card>
    </CardList>
  );
}
