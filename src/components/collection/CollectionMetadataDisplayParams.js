import React from 'react';
import MetadataDisplayParams from '../metadata/MetadataDisplayParams';
import * as formActions from '../../formactions/collection';

export default function CollectionMetadataDisplayParams({ ...props }) {
  return (
    <MetadataDisplayParams
      onSubmit={formActions.onGetMetadata}
      {...props}
    />
  );
}
