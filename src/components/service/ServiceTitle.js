import React from 'react';
import Chip from '@material-ui/core/Chip';

import TitleHeader from '../ui/TitleHeader';
import { OnlineIcon, OfflineIcon } from '../ui/StatusIcon';

const getServiceListStatus = ({ vidispineServiceListDocument }) => {
  if (vidispineServiceListDocument === undefined) { return null; }
  const { service: serviceList = [] } = vidispineServiceListDocument;
  const notRunning = serviceList.filter((thisService) => thisService.isRunning !== true);
  if (notRunning.length === 0) {
    return (
      <Chip
        avatar={
          <OnlineIcon />
        }
        label="All Services Running"
      />
    );
  }
  return (
    <Chip
      avatar={
        <OfflineIcon />
      }
      label={`${notRunning.length} ${notRunning.length === 1 ? 'Service' : 'Services'} Not Running`}
    />
  );
};

export default function ServiceTitle(props) {
  const StatusIcon = getServiceListStatus({ vidispineServiceListDocument: props.code });
  return (
    <TitleHeader
      title="Service"
      helpTo="/ref/vidispine-service.html"
      iconList={StatusIcon}
      {...props}
    />
  );
}
