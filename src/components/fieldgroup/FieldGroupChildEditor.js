import React from 'react';
import PlaylistAdd from '@material-ui/icons/PlaylistAdd';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

import FieldGroupListTable from './FieldGroupListTable';
import FieldGroupChildDialog from './FieldGroupChildDialog';
import withModal from '../../hoc/withModal';

const ADD_FIELDGROUP_CHILD = 'ADD_FIELDGROUP_CHILD';

function FieldGroupChildEditor({
  groupName,
  onRefresh,
  metadataFieldGroupDocument,
  onOpen,
}) {
  return (
    <>
      <CardHeader
        disableTypography
        title={<Typography variant="subtitle1">Groups</Typography>}
        action={(
          <Grid container direction="row-reverse" alignItems="center">
            <Grid item>
              <Tooltip title="New">
                <IconButton onClick={() => onOpen({ modalName: ADD_FIELDGROUP_CHILD })}>
                  <PlaylistAdd />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        )}
      />
      <CardContent>
        <FieldGroupListTable
          metadataFieldGroupListDocument={metadataFieldGroupDocument}
          groupName={groupName}
          onRefresh={onRefresh}
        />
      </CardContent>
      <FieldGroupChildDialog
        dialogName={ADD_FIELDGROUP_CHILD}
        groupName={groupName}
        onSuccess={onRefresh}
      />
    </>
  );
}

export default withModal(FieldGroupChildEditor);
