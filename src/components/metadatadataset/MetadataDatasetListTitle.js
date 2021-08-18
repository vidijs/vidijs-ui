import React from 'react';

import TitleHeader from '../ui/TitleHeader';

export default function MetadataDatasetListTitle(props) {
  return (
    <TitleHeader
      title="Metadata Dataset"
      helpTo="/ref/metadata/dataset-ref.html"
      {...props}
    />
  );
}
