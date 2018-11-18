import React from 'react';

import TitleHeader from '../ui/TitleHeader';

export default function MetadataFieldTitle(props) {
  return (
    <TitleHeader
      parentTitle="Metadata Field"
      parentTo="/metadata-field/"
      title={props.fieldName}
      helpTo="/ref/metadata/field.html"
      entityId={props.fieldName}
      entityType="metadata-field"
      {...props}
    />
  );
}
