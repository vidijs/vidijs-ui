import React from 'react';

import TitleHeader from '../ui/TitleHeader';

export default function FieldGroupListTitle(props) {
  return (
    <TitleHeader
      title="Metadata Field Group"
      helpTo="/ref/metadata/field-group.html"
      {...props}
    />
  );
}
