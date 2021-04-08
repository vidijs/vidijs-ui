import React from 'react';

import TextGrid from '../ui/TextGrid';
import TypeSection from '../ui/TypeSection';
import { SimpleMetadataType } from '../ui/DisplayType';

const DeletionLockType = ({ value = {}, showMetadataType = false }) => (
  <>
    <TextGrid
      title="Lock ID"
      value={value.id}
    />
    <TextGrid
      title="User"
      value={value.user}
      variant="username"
    />
    <TextGrid
      title="Expiry Time"
      value={value.expiryTime}
      variant="timestring"
    />
    <TextGrid
      title="Modified"
      value={value.modified}
      variant="timestring"
    />
    <TextGrid
      title="Entity Type"
      value={value.entityType}
      to={value.entityType ? `/${value.entityType.toLowerCase()}/` : undefined}
      variant="link"
    />
    <TextGrid
      title="Entity ID"
      value={value.entityId}
      to={value.entityId ? `/${value.entityType.toLowerCase()}/${value.entityId}/` : undefined}
      variant="link"
    />
    <TextGrid
      title="Effective"
      value={value.isEffective}
      variant="boolean"
    />
    <TextGrid
      title="Inherited"
      value={value.isInherited}
      variant="boolean"
    />
    <TextGrid
      title="Expired"
      value={value.isExpired}
      variant="boolean"
    />
    {showMetadataType && (
      <TypeSection
        value={value.metadata}
        component={SimpleMetadataType}
      />
    )}
  </>
);

export default function DeletionLockDisplay({
  deletionLockDocument,
  showMetadataType,
}) {
  return (
    <>
      <TypeSection
        value={deletionLockDocument}
        component={DeletionLockType}
        showMetadataType={showMetadataType}
      />
    </>
  );
}
