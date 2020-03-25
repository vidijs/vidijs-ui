import React from 'react';

import TextGrid from '../ui/TextGrid';
import TypeSection from '../ui/TypeSection';
import TypeArray from '../ui/TypeArray';


export const BulkyMetadataEntry = ({ value = {} }) => (
  <React.Fragment>
    <TextGrid
      title={value.key}
      value={value.value}
    />
  </React.Fragment>
);

export const BulkyMetadataMap = ({ value = {} }) => (
  <React.Fragment>
    <TypeArray
      value={value.entry}
      component={BulkyMetadataEntry}
    />
  </React.Fragment>
);

export const BulkyMetadataMaps = ({ value = {} }) => (
  <React.Fragment>
    <TypeArray
      value={value.map}
      component={BulkyMetadataMap}
    />
  </React.Fragment>
);

export const BulkyMetadataType = ({ value }) => (
  <div style={{ marginBottom: 4 }}>
    {value.value && (
      <TextGrid
        title={`Start:${value.start} End:${value.end}`}
        value={value.value}
        titleStartCase={false}
        titleTypographyProps={{ noWrap: false }}
      />
    )}
    {value.maps && (
      <TypeSection
        title={`Start: ${value.start} End: ${value.end}`}
        titleStartCase={false}
        value={value.maps}
        component={BulkyMetadataMaps}
      />
    )}
  </div>
);

export default function BulkyMetadataDisplay({
  bulkyMetadataDocument,
}) {
  const { field = [] } = bulkyMetadataDocument;
  return (
    <React.Fragment>
      <TypeArray
        value={field}
        component={BulkyMetadataType}
      />
    </React.Fragment>
  );
}
