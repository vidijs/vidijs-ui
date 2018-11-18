import React from 'react';

import TitleHeader from '../ui/TitleHeader';

export default function FieldGroupTitle(props) {
  return (
    <TitleHeader
      parentTitle="Metadata Field Group"
      parentTo="/field-group/"
      title={props.groupName}
      helpTo="/ref/metadata/field-group.html"
      entityId={props.groupName}
      entityType="field-group"
      {...props}
    />
  );
}
