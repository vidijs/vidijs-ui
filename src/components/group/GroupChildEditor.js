import React from 'react';
import PlaylistAdd from '@material-ui/icons/PlaylistAdd';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';

import GroupTable from './GroupTable';
import GroupChildDialog from './GroupChildDialog';
import withModal from '../../hoc/withModal';

const ADD_GROUP_CHILD = 'ADD_GROUP_CHILD';

function GroupChildEditor({
  groupName,
  onSuccess,
  groupDocument,
  onOpen,
}) {
  return (
    <>
      <CardHeader
        disableTypography
        title={<Typography variant="subtitle1">Child Groups</Typography>}
        action={(
          <Grid container direction="row-reverse" alignItems="center">
            <Grid item>
              <Tooltip title="Add">
                <IconButton onClick={() => onOpen({ modalName: ADD_GROUP_CHILD })}>
                  <PlaylistAdd />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        )}
      />
      <GroupTable
        groupListDocument={groupDocument.childGroupList}
        parentGroupName={groupName}
        onSuccess={onSuccess}
        showRemove
      />
      <GroupChildDialog
        dialogName={ADD_GROUP_CHILD}
        groupName={groupName}
        groupDocument={groupDocument}
        onSuccess={onSuccess}
      />
    </>
  );
}

export default withModal(GroupChildEditor);
