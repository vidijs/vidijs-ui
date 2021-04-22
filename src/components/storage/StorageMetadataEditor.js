import React from 'react';

import SimpleMetadataEditor from '../ui/SimpleMetadataEditor';

export default function StorageMetadataEditor({
  storageDocument,
  storageId,
  onRefresh,
  ...props
}) {
  return (
    <SimpleMetadataEditor
      entityType="storage"
      entityId={storageId}
      simpleMetadataDocument={storageDocument.metadata}
      onSuccess={onRefresh}
      {...props}
    />
  );
}
