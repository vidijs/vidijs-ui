import React from 'react';
import DeleteForever from '@material-ui/icons/DeleteForever';
import IconButton from '@material-ui/core/IconButton';

import TitleHeader from '../ui/TitleHeader';

export default function StorageTitle({
  openCode,
  onRefresh,
  storageId,
  storageMethodId,
  openRemove,
}) {
  return (
    <TitleHeader
      title={`Method ${storageMethodId}`}
      grandParentTitle="Storage"
      grandParentTo="/storage/"
      parentTitle={storageId}
      parentTo={`/storage/${storageId}`}
      openCode={openCode}
      onRefresh={onRefresh}
      helpTo="/ref/storage/storage.html#storage-methods"
      actionComponent={(
        <IconButton onClick={openRemove}>
          <DeleteForever />
        </IconButton>
      )}
    />
  );
}
