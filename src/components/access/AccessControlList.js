import React from 'react';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import PlaylistAdd from '@material-ui/icons/PlaylistAdd';

import AccessControlCard from './AccessControlCard';

export default function AccessControlListCard({
  accessControlListDocument = {},
  onRefresh,
  entityType,
  entityId,
  openRemove,
  openCreate,
}) {
  const { access: accessList = [] } = accessControlListDocument;
  return (
    <>
      {openCreate && (
        <CardHeader
          action={(
            <IconButton onClick={openCreate}>
              <PlaylistAdd />
            </IconButton>
          )}
        />
      )}
      {
        accessList.map((accessControlDocument) => (
          <AccessControlCard
            accessControlDocument={accessControlDocument}
            key={accessControlDocument.id}
            onRefresh={onRefresh}
            entityType={entityType}
            entityId={entityId}
            openRemove={openRemove}
          />
        ))
      }
    </>
  );
}
