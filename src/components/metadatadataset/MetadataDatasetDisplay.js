import React from 'react';

import TextGrid from '../ui/TextGrid';

function MetadataDatasetDisplay({
  value,
}) {
  return (
    <TextGrid
      title="body"
      value={value}
      variant="application/ld+json"
    />
  );
}

export default MetadataDatasetDisplay;
