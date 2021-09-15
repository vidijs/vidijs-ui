import React from 'react';

import SimpleMetadataEditor from '../ui/SimpleMetadataEditor';

export default function ShapeComponentMetadataEditor({
  metadata, componentId, itemId, shapeId, onRefresh, ...props
}) {
  return (
    <SimpleMetadataEditor
      simpleMetadataDocument={{ field: metadata }}
      titleProps={{ variant: 'subtitle2' }}
      onSuccess={onRefresh}
      entityType="item"
      entityId={`${itemId}/shape/${shapeId}/component/${componentId}`}
      {...props}
    />
  );
}
