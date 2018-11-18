import React from 'react';

import SquareCard from '../ui/SquareCard';
import StorageGroupStorageEditor from './StorageGroupStorageEditor';

export default function StorageGroupStorageCard({
  groupName,
  storageDocument,
  onRefresh,
  storageId,
}) {
  return (
    <SquareCard>
      <StorageGroupStorageEditor
        storageId={storageId}
        groupName={groupName}
        storageDocument={storageDocument}
        onRefresh={onRefresh}
      />
    </SquareCard>
  );
}
