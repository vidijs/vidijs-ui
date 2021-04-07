import React from 'react';
import PlaylistAdd from '@material-ui/icons/PlaylistAdd';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';

import UserTable from '../user/UserTable';
import GroupUserDialog from './GroupUserDialog';
import withModal from '../../hoc/withModal';

const ADD_GROUP_USER = 'ADD_GROUP_USER';

function GroupUserEditor({
  groupName,
  onSuccess,
  groupDocument,
  onOpen,
}) {
  return (
    <>
      <CardHeader
        disableTypography
        title={<Typography variant="subtitle1">Users</Typography>}
        action={(
          <Grid container direction="row-reverse" alignItems="center">
            <Grid item>
              <Tooltip title="Add">
                <IconButton onClick={() => onOpen({ modalName: ADD_GROUP_USER })}>
                  <PlaylistAdd />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        )}
      />
      <UserTable
        userListDocument={groupDocument.userList}
        groupName={groupName}
        onSuccess={onSuccess}
        showRemove
      />
      <GroupUserDialog
        dialogName={ADD_GROUP_USER}
        groupName={groupName}
        groupDocument={groupDocument}
        onSuccess={onSuccess}
      />
    </>
  );
}

export default withModal(GroupUserEditor);
