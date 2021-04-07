import React from 'react';

import StorageListStorageCard from './StorageListStorageCard';

export default function StorageListCard({ storageListDocument }) {
  const { storage: storageList = [] } = storageListDocument;
  return (
    storageList.map((storageDocument) => (
      <StorageListStorageCard
        key={storageDocument.id}
        storageDocument={storageDocument}
      />
    ))
  );
}
