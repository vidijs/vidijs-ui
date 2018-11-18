import React from 'react';
import MetadataDisplayParams from '../metadata/MetadataDisplayParams';
import * as formActions from '../../formactions/item';

export default function ItemMetadataDisplayParams({ ...props }) {
  return (
    <MetadataDisplayParams
      onSubmit={formActions.onGetMetadata}
      {...props}
    />
  );
}
