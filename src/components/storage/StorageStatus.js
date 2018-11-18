import React from 'react';
import Chip from '@material-ui/core/Chip';
import startCase from 'lodash.startcase';

import { OnlineIcon, OfflineIcon, WarningIcon } from '../ui/StatusIcon';
import { OK_STATES, WARNING_STATES } from '../../const/StorageStates';

const StorageStatus = ({ storageDocument }) => {
  if (storageDocument === undefined) { return null; }
  const { state } = storageDocument;
  if (OK_STATES.includes(state)) {
    const label = state === 'NONE' ? 'Online' : state.toLowerCase();
    return (
      <Chip
        avatar={
          <OnlineIcon />
        }
        label={label}
      />
    );
  }
  if (WARNING_STATES.includes(state)) {
    return (
      <Chip
        avatar={
          <WarningIcon />
        }
        label={startCase(state.toLowerCase())}
      />
    );
  }
  return (
    <Chip
      avatar={
        <OfflineIcon />
      }
      label={state ? startCase(state.toLowerCase()) : 'Unknown'}
    />
  );
};

export default StorageStatus;
