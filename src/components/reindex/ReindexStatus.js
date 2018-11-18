import React from 'react';
import startCase from 'lodash.startcase';
import Chip from '@material-ui/core/Chip';

import { OK_STATES, WARNING_STATES, ERROR_STATES } from '../../const/ReindexStates';
import { OnlineIcon, OfflineIcon, WarningIcon } from '../ui/StatusIcon';

const ReindexStatus = ({ reindexRequestDocument }) => {
  if (reindexRequestDocument === undefined) { return null; }
  let statusChip = <Chip avatar={<WarningIcon />} label="Unknown" />;
  const { status } = reindexRequestDocument;
  if (OK_STATES.includes(status)) {
    statusChip = <Chip avatar={<OnlineIcon />} label={startCase(status)} />;
  } else if (WARNING_STATES.includes(status)) {
    statusChip = <Chip avatar={<WarningIcon />} label={startCase(status)} />;
  } else if (ERROR_STATES.includes(status)) {
    statusChip = <Chip avatar={<OfflineIcon />} label={startCase(status)} />;
  }
  return statusChip;
};

export default ReindexStatus;
