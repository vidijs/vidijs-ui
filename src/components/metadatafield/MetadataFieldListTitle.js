import React from 'react';

import TitleHeader from '../ui/TitleHeader';

export default function MetadataFieldListTitle(props) {
  return (
    <TitleHeader
      title="Metadata Field"
      helpTo="/ref/metadata/field.html"
      {...props}
    />
  );
}
