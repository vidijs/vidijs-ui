import React from 'react';
import Chip from '@material-ui/core/Chip';
import startCase from 'lodash.startcase';

import {
  OnlineIcon,
  OfflineIcon,
  WarningIcon,
  LoadingIcon,
} from '../ui/StatusIcon';
import { OK_STATES, WARNING_STATES, RUNNING_STATES } from '../../const/JobStates';

const JobStatus = ({ jobDocument }) => {
  if (jobDocument === undefined) { return null; }
  const { status } = jobDocument;
  const isLoading = RUNNING_STATES.includes(status);
  if (OK_STATES.includes(status)) {
    return (
      <Chip
        avatar={(
          <LoadingIcon isLoading={isLoading}>
            <OnlineIcon />
          </LoadingIcon>
        )}
        label={startCase(status.toLowerCase())}
      />
    );
  }
  if (WARNING_STATES.includes(status)) {
    return (
      <Chip
        avatar={(
          <LoadingIcon isLoading={isLoading}>
            <WarningIcon />
          </LoadingIcon>
        )}
        label={startCase(status.toLowerCase())}
      />
    );
  }
  return (
    <Chip
      avatar={(
        <LoadingIcon isLoading={isLoading}>
          <OfflineIcon />
        </LoadingIcon>
      )}
      label={status ? startCase(status.toLowerCase()) : 'Unknown'}
    />
  );
};

export default JobStatus;
