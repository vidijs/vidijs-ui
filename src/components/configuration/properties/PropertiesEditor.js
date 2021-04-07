import React from 'react';
import PlaylistAdd from '@material-ui/icons/PlaylistAdd';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

import PropertiesTable from './PropertiesTable';
import PropertiesDialog from './PropertiesDialog';
import withModal from '../../../hoc/withModal';

const ADD_CONFIGURATIONPROPERTIES = 'ADD_CONFIGURATIONPROPERTIES';

function PropertiesEditor({
  onRefresh,
  configurationPropertyListDocument,
  onOpen,
}) {
  return (
    <>
      <CardHeader
        action={(
          <Grid container direction="row-reverse" alignItems="center">
            <Grid item>
              <Tooltip title="New">
                <IconButton onClick={() => onOpen({ modalName: ADD_CONFIGURATIONPROPERTIES })}>
                  <PlaylistAdd />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        )}
      />
      <CardContent>
        <PropertiesTable
          configurationPropertyListDocument={configurationPropertyListDocument}
          onRefresh={onRefresh}
        />
      </CardContent>
      <PropertiesDialog
        dialogName={ADD_CONFIGURATIONPROPERTIES}
        onSuccess={onRefresh}
      />
    </>
  );
}

export default withModal(PropertiesEditor);
