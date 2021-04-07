import React from 'react';

import TypeSection from '../ui/TypeSection';
import { MetadataGroupValueType, MetadataFieldValueType } from './MetadataDisplay';
import TextGrid from '../ui/TextGrid';

export const MetadataEntrySourceType = ({ value = {} }) => (
  <>
    <TextGrid
      title="Source ID"
      value={value.id}
      variant={value.type}
    />
    <TextGrid
      title="Source Type"
      value={value.type}
    />
    <TextGrid
      title="Source Location"
      value={value.loc}
    />
  </>
);

export default function MetadataEntryDisplay({
  metadataEntryDocument,
}) {
  if (metadataEntryDocument === undefined) { return null; }
  const {
    group,
    field,
    value,
    source,
  } = metadataEntryDocument;
  return (
    <>
      <TypeSection
        value={group}
        component={MetadataGroupValueType}
        title="group"
        hideNoValue
      />
      <TypeSection
        value={field}
        component={MetadataFieldValueType}
        title="field"
        hideNoValue
      />
      <TextGrid
        title="value"
        value={value}
        hideNoValue
      />
      <TypeSection
        value={source}
        component={MetadataEntrySourceType}
        title="source"
        hideNoValue
      />
    </>
  );
}
