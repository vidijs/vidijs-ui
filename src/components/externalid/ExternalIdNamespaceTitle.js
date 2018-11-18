import React from 'react';

import TitleHeader from '../ui/TitleHeader';

export default function ExternalIdNamespaceTitle(props) {
  return (
    <TitleHeader
      title="External ID Namespace"
      helpTo="/ref/external-id.html"
      {...props}
    />
  );
}
