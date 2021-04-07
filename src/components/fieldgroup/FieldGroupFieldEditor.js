import React from 'react';
import PlaylistAdd from '@material-ui/icons/PlaylistAdd';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

import MetadataFieldListTable from '../metadatafield/MetadataFieldListTable';
import FieldGroupFieldDialog from './FieldGroupFieldDialog';
import withModal from '../../hoc/withModal';

const ADD_FIELDGROUP_FIELD = 'ADD_FIELDGROUP_FIELD';

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
        title={<Typography variant="subtitle1">Metadata Fields</Typography>}
        action={(
          <Grid container direction="row-reverse" alignItems="center">
            <Grid item>
              <Tooltip title="Add">
                <IconButton onClick={() => onOpen({ modalName: ADD_FIELDGROUP_FIELD })}>
                  <PlaylistAdd />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        )}
      />
      <CardContent>
        <MetadataFieldListTable
          metadataFieldListDocument={metadataFieldGroupDocument}
          groupName={groupName}
          onRefresh={onRefresh}
        />
      </CardContent>
      <FieldGroupFieldDialog
        dialogName={ADD_FIELDGROUP_FIELD}
        groupName={groupName}
        onSuccess={onRefresh}
      />
    </>
  );
}

export default withModal(FieldGroupChildEditor);
