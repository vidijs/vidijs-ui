import React from 'react';

import TextGrid from '../ui/TextGrid';
import TextGridArray from '../ui/TextGridArray';
import TypeSection from '../ui/TypeSection';
import TypeArray from '../ui/TypeArray';

export const MetadataFieldValueType = ({ value = {} }) => {
  const { value: valueList = [] } = value;
  const valueListValues = valueList.map((thisValue) => thisValue.value);
  return (
    <TextGridArray
      title={value.name}
      value={valueListValues}
      titleStartCase={false}
      titleGridProps={{
        xl: 2,
      }}
      titleTypographyProps={{
        style: {
          wordWrap: 'break-word',
        },
        noWrap: false,
      }}
      valueTypographyProps={{
        style: {
          wordWrap: 'break-word',
        },
        noWrap: false,
      }}
      hover
    />
  );
};

export const MetadataGroupValueType = ({ value = {} }) => (
  <>
    <TextGrid
      title="Group Name"
      value={value.name}
      variant="group"
      titleStartCase={false}
    />
    <TypeArray
      arrayTitle="Fields"
      value={value.field}
      component={MetadataFieldValueType}
      titleStartCase={false}
    />
    <TypeArray
      arrayTitle="Groups"
      value={value.group}
      component={MetadataGroupValueType}
      titleStartCase={false}
    />
  </>
);

export const MetadataType = ({ value = {} }) => (
  <>
    <TypeArray
      value={value.timespan}
      hover={false}
      dense
      component={({ value: v = {} }) => (
        <>
          <TextGrid
            title="Timespan"
            value={`${v.start} ${v.end}`}
          />
          <TypeArray
            arrayTitle="Fields"
            value={v.field}
            component={MetadataFieldValueType}
            titleStartCase={false}
            hideNoValue
          />
          <TypeArray
            arrayTitle="Groups"
            value={v.group}
            component={MetadataGroupValueType}
            titleStartCase={false}
            hideNoValue
          />
        </>
      )}
    />
  </>
);

export default function MetadataDisplay({
  metadataDocument,
}) {
  return (
    <>
      <TypeSection
        value={metadataDocument}
        component={MetadataType}
      />
    </>
  );
}
