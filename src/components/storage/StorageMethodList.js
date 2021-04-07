import React from 'react';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import PlaylistAdd from '@material-ui/icons/PlaylistAdd';

import StorageMethodListTable from './StorageMethodListTable';

export default function StorageMethodList({ storageDocument, openMethodCreate }) {
  const action = openMethodCreate ? (
    <IconButton onClick={openMethodCreate}>
      <PlaylistAdd />
    </IconButton>
  ) : undefined;
  return (
    <>
      <CardHeader
        disableTypography
        title={<Typography variant="subtitle1">Methods</Typography>}
        action={action}
      />
      <CardContent>
        <StorageMethodListTable
          storageDocument={storageDocument}
        />
      </CardContent>
    </>
  );
}
