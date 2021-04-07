import React from 'react';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Delete from '@material-ui/icons/Delete';

import AccessControlDisplay from './AccessControlDisplay';

export default function AccessControlEditor({
  accessControlDocument,
  entityType,
  entityId,
  openRemove,
}) {
  const { id: accessId, permission } = accessControlDocument;
  let actionComponent;
  if (permission !== 'OWNER') {
    actionComponent = (
      <IconButton onClick={openRemove(accessId)}>
        <Delete />
      </IconButton>
    );
  }
  return (
    <>
      <CardHeader
        subheader={accessControlDocument.id}
        action={actionComponent}
      />
      <CardContent>
        <AccessControlDisplay
          accessControlDocument={accessControlDocument}
          entityType={entityType}
          entityId={entityId}
        />
      </CardContent>
    </>
  );
}
