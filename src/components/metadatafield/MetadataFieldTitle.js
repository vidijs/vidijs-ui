import React from 'react';

import TitleHeader from '../ui/TitleHeader';

export default function MetadataFieldTitle(props) {
  return (
    <TitleHeader
      grandParentTitle="Metadata Field"
      grandParentTo="/metadata-field/"
      parentTitle={props.fieldName}
      helpTo="/ref/metadata/field.html"
      entityId={props.fieldName}
      entityType="metadata-field"
      {...props}
    />
  );
}
