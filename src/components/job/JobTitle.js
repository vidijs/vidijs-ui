import React from 'react';
import Typography from '@material-ui/core/Typography';

import TitleHeader from '../ui/TitleHeader';
import Menu, { MenuItem } from '../ui/Menu';
import { withModalNoRouter } from '../../hoc/withModal';
import JobStatus from './JobStatus';
import { RUNNING_STATES } from '../../const/JobStates';

const RunningMenuItem = ({
  jobDocument,
  priorityDialog,
  abortDialog,
  onOpen,
}) => {
  if (jobDocument === undefined) { return null; }
  const { status } = jobDocument;
  if (!RUNNING_STATES.includes(status)) { return null; }
  return (
    <>
      <MenuItem onClick={() => onOpen({ modalName: priorityDialog })}>
        <Typography color="inherit">Change Priority</Typography>
      </MenuItem>
      <MenuItem onClick={() => onOpen({ modalName: abortDialog })}>
        <Typography color="secondary">Abort</Typography>
      </MenuItem>
    </>
  );
};

function JobTitle({
  onOpen,
  priorityDialog,
  abortDialog,
  removeDialog,
  duplicateDialog,
  ...props
}) {
  return (
    <TitleHeader
      parentTitle="Job"
      parentTo="/job/"
      helpTo="/ref/job.html"
      codeModal="JobDocument"
      iconList={(
        <>
          <JobStatus jobDocument={props.code} />
          <Menu>
            <RunningMenuItem
              jobDocument={props.code}
              priorityDialog={priorityDialog}
              abortDialog={abortDialog}
              onOpen={onOpen}
            />
            <MenuItem onClick={() => onOpen({ modalName: duplicateDialog })}>
              <Typography color="inherit">Duplicate Job</Typography>
            </MenuItem>
            <MenuItem onClick={() => onOpen({ modalName: removeDialog })}>
              <Typography color="secondary">Delete</Typography>
            </MenuItem>
          </Menu>
        </>
      )}
      {...props}
    />
  );
}
export default withModalNoRouter(JobTitle);
