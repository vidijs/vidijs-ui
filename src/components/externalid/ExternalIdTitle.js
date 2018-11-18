import React from 'react';
import startCase from 'lodash.startcase';

import TitleHeader from '../ui/TitleHeader';

export default function ExternalIdTitle({
  entityType,
  entityId,
  ...props
}) {
  return (
    <TitleHeader
      title="External ID"
      grandParentTitle={startCase(entityType)}
      parentTitle={entityId}
      parentTo={`/${entityType}/${entityId}/`}
      grandParentTo={`/${entityType}/`}
      helpTo="/ref/external-id.html"
      {...props}
    />
  );
}
