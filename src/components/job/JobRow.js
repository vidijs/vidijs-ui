import React from 'react';
import moment from 'moment';

import UnstyledLink from '../ui/UnstyledLink';
import TableCell from '../ui/TableCell';
import TableRow from '../ui/TableRow';
import JobStatus from './JobStatus';


export default function JobListRow({
  jobDocument,
}) {
  let durationHuman;
  const startMoment = moment(jobDocument.started);
  if (jobDocument.finished) {
    const finishedMoment = moment(jobDocument.finished);
    const durationMoment = moment.duration(finishedMoment.diff(startMoment));
    durationHuman = durationMoment.humanize();
  } else if (jobDocument.status === 'STARTED') {
    const nowMoment = moment();
    const durationMoment = moment.duration(nowMoment.diff(startMoment));
    durationHuman = `${parseInt(durationMoment.asMinutes(), 10)} minutes`;
  }
  const JobLink = props => <UnstyledLink to={`/job/${jobDocument.jobId}/`} {...props} />;
  return (
    <TableRow to={`/job/${jobDocument.jobId}/`} hover>
      <TableCell><JobLink>{jobDocument.jobId}</JobLink></TableCell>
      <TableCell><JobLink>{jobDocument.user}</JobLink></TableCell>
      <TableCell>
        <JobLink>
          {jobDocument.started ? moment(jobDocument.started).format('YYYY-MM-DD HH:mm') : ''}
        </JobLink>
      </TableCell>
      <TableCell>
        <JobLink>
          {jobDocument.finished ? moment(jobDocument.finished).format('YYYY-MM-DD HH:mm') : ''}
        </JobLink>
      </TableCell>
      <TableCell><JobLink>{durationHuman}</JobLink></TableCell>
      <TableCell><JobLink><JobStatus jobDocument={jobDocument} /></JobLink></TableCell>
      <TableCell><JobLink>{jobDocument.type}</JobLink></TableCell>
      <TableCell><JobLink>{jobDocument.priority}</JobLink></TableCell>
    </TableRow>
  );
}
