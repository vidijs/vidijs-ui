import React from 'react';

import TitleHeader from '../ui/TitleHeader';

export default function MetadataDatasetTitle(props) {
  return (
    <TitleHeader
      parentTitle="Metadata Dataset"
      parentTo="/metadata-dataset/"
      title={props.datasetId}
      helpTo="/ref/metadata/dataset-ref.html"
      entityId={props.datasetId}
      entityType="metadata-dataset"
      {...props}
    />
  );
}
