import React from 'react';
import LinkIcon from '@material-ui/icons/Link';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { withRouter } from 'react-router-dom';

const ExternalIdLink = ({ entityId, entityType, history }) => (
  <Tooltip title="External Id">
    <IconButton onClick={() => history.push(`/external-id/${entityType}/${entityId}`)}>
      <LinkIcon />
    </IconButton>
  </Tooltip>
);

export default withRouter(ExternalIdLink);
