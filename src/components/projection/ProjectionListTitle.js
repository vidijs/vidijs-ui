import React from 'react';
import Typography from '@material-ui/core/Typography';

import TitleHeader from '../ui/TitleHeader';
import Menu, { MenuItem } from '../ui/Menu';
import { withModalNoRouter } from '../../hoc/withModal';

function ProjectionListTitle({
  incomingDialog,
  outgoingDialog,
  onOpen,
  ...props
}) {
  return (
    <TitleHeader
      {...props}
      actionComponent={(
        <Menu>
          <MenuItem onClick={() => onOpen({ modalName: incomingDialog })}>
            <Typography>Create Incoming Projection</Typography>
          </MenuItem>
          <MenuItem onClick={() => onOpen({ modalName: outgoingDialog })}>
            <Typography>Create Outgoing Projection</Typography>
          </MenuItem>
        </Menu>
      )}
    />
  );
}
export default withModalNoRouter(ProjectionListTitle);
