import React from 'react';
import MetadataEditor from '../metadata/MetadataEditor';
import * as formActions from '../../formactions/collection';

export default function CollectionMetadataEditor({ ...props }) {
  return (
    <MetadataEditor
      onSubmit={formActions.onUpdateMetadata}
      {...props}
    />
  );
}
