import React from 'react';
import Chip from '@material-ui/core/Chip';

import {
  OnlineIcon,
  OfflineIcon,
  WarningIcon,
  LoadingIcon,
} from '../ui/StatusIcon';

const SelfTestStatus = ({ selfTestDocument = {}, loading = false, ...chipProps }) => {
  if (loading === true) {
    return (
      <Chip
        avatar={
          <LoadingIcon />
        }
        label="Loading"
        {...chipProps}
      />
    );
  }
  const { status, took } = selfTestDocument;
  if (status === 'ok') {
    return (
      <Chip
        avatar={
          <OnlineIcon />
        }
        label={`Online${took ? ` (${took})` : ''}`}
        {...chipProps}
      />
    );
  }
  if (status === 'warning') {
    return (
      <Chip
        avatar={
          <WarningIcon />
        }
        label={`Warning${took ? ` (${took})` : ''}`}
        {...chipProps}
      />
    );
  }
  return (
    <Chip
      avatar={
        <OfflineIcon />
      }
      label={`Failed${took ? ` (${took})` : ''}`}
      {...chipProps}
    />
  );
};

export default SelfTestStatus;
