import React from 'react';
import Chip from '@material-ui/core/Chip';
import startCase from 'lodash.startcase';

import { OnlineIcon, OfflineIcon, WarningIcon } from '../ui/StatusIcon';
import { OK_STATES, WARNING_STATES } from '../../const/JobStates';

const JobStatus = ({ jobDocument }) => {
  if (jobDocument === undefined) { return null; }
  const { status } = jobDocument;
  if (OK_STATES.includes(status)) {
    return (
      <Chip
        avatar={
          <OnlineIcon />
        }
        label={startCase(status.toLowerCase())}
      />
    );
  } else if (WARNING_STATES.includes(status)) {
    return (
      <Chip
        avatar={
          <WarningIcon />
        }
        label={startCase(status.toLowerCase())}
      />
    );
  }
  return (
    <Chip
      avatar={
        <OfflineIcon />
      }
      label={status ? startCase(status.toLowerCase()) : 'Unknown'}
    />
  );
};

export default JobStatus;
