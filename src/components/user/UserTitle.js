import React from 'react';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

import TitleHeader from '../ui/TitleHeader';
import { OfflineIcon } from '../ui/StatusIcon';
import withModal from '../../hoc/withModal';
import Menu, { MenuItem } from '../ui/Menu';

const UserStatus = ({ userDocument }) => {
  if (userDocument === undefined) { return null; }
  const { disabled } = userDocument;
  if (disabled === true) {
    return (
      <Chip
        avatar={
          <OfflineIcon />
        }
        label="Disabled"
      />
    );
  }
  return null;
};

const DisableMenuItem = ({
  userDocument,
  onEnable,
  onDisable,
}) => {
  if (userDocument === undefined) { return null; }
  if (userDocument.disabled === true) {
    return (
      <MenuItem onClick={onEnable}>
        <Typography>Enable User</Typography>
      </MenuItem>
    );
  }
  return (
    <MenuItem onClick={onDisable}>
      <Typography color="secondary">Disable User</Typography>
    </MenuItem>
  );
};

function UserTitle({
  userName,
  onOpen,
  onEnable,
  onDisable,
  realNameModal,
  tokenModal,
  passwordModal,
  history,
  ...props
}) {
  const { code } = props;
  return (
    <TitleHeader
      helpTo="/ref/user.html"
      title={userName}
      parentTitle="User"
      parentTo="/user/"
      iconList={(
        <>
          <Tooltip title="Access Keys">
            <IconButton onClick={() => history.push(`/user/${userName}/key`)}>
              <VpnKeyIcon />
            </IconButton>
          </Tooltip>
          <UserStatus userDocument={code} />
          <Menu>
            <MenuItem onClick={() => onOpen({ modalName: passwordModal })}>
              <Typography>Change Password</Typography>
            </MenuItem>
            <MenuItem onClick={() => onOpen({ modalName: realNameModal })}>
              <Typography>Change Real Name</Typography>
            </MenuItem>
            <MenuItem onClick={() => onOpen({ modalName: tokenModal })}>
              <Typography>Generate Token</Typography>
            </MenuItem>
            {userName !== 'admin' && (
            <DisableMenuItem
              userDocument={code}
              onEnable={onEnable}
              onDisable={onDisable}
            />
            )}
          </Menu>
        </>
      )}
      {...props}
    />
  );
}

export default withModal(UserTitle);
