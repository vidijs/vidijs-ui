import React from 'react';
import MetadataEditor from '../metadata/MetadataEditor';
import * as formActions from '../../formactions/item';

export default function ItemMetadataEditor({ metadataDocument, ...props }) {
  return (
    <MetadataEditor
      title="Item Metadata"
      onSubmit={formActions.onUpdateMetadata}
      metadataDocument={metadataDocument}
      {...props}
    />
  );
}
