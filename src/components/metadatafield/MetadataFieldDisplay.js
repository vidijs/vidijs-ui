import React from 'react';

import TextGrid from '../ui/TextGrid';
import TypeSection from '../ui/TypeSection';

import { SimpleMetadataType, KeyValuePairType } from '../ui/DisplayType';

export const MetadataFieldFloatType = ({ value = {} }) => (
  <>
    <TextGrid
      title="minInclusive"
      value={value.minInclusive}
    />
    <TextGrid
      title="maxInclusive"
      value={value.maxInclusive}
    />
  </>
);

export const MetadataFieldIntegerType = ({ value = {} }) => (
  <>
    <TextGrid
      title="minInclusive"
      value={value.minInclusive}
    />
    <TextGrid
      title="maxInclusive"
      value={value.maxInclusive}
    />
  </>
);

export const MetadataFieldLongType = ({ value = {} }) => (
  <>
    <TextGrid
      title="minInclusive"
      value={value.minInclusive}
    />
    <TextGrid
      title="maxInclusive"
      value={value.maxInclusive}
    />
  </>
);

export const MetadataFieldStringType = ({ value = {} }) => (
  <>
    <TextGrid
      title="pattern"
      value={value.pattern}
    />
    <TextGrid
      title="minLength"
      value={value.minLength}
    />
    <TextGrid
      title="maxLength"
      value={value.maxLength}
    />
  </>
);

export const MetadataSchemaElementType = ({ value = {} }) => (
  <>
    <TextGrid
      title="name"
      value={value.name}
      hover
    />
    <TextGrid
      title="reference"
      value={value.reference}
      hover
    />
    <TextGrid
      title="min"
      value={value.min}
      hover
    />
    <TextGrid
      title="max"
      value={value.max}
      hover
    />
  </>
);

export function MetadataFieldType({
  value,
}) {
  return (
    <>
      <TextGrid
        title="name"
        value={value.name}
        hover
      />
      <TextGrid
        title="type"
        value={value.type}
        hover
      />
      <TextGrid
        title="defaultValue"
        value={value.defaultValue}
        hover
      />
      <TextGrid
        title="system"
        value={value.system}
        variant="boolean"
        hover
      />
      <TextGrid
        title="sortable"
        value={value.sortable}
        variant="boolean"
        hover
      />
      <TextGrid
        title="inheritance"
        value={value.inheritance}
        variant="boolean"
        hover
      />
      <TextGrid
        title="fullText"
        value={value.fullText}
        variant="boolean"
        hover
      />
      <TextGrid
        title="index"
        value={value.index}
        hover
      />
      <TypeSection
        title="schema"
        component={MetadataSchemaElementType}
        value={value.schema}
        hideNoValue
      />
      <TypeSection
        title="values"
        component={SimpleMetadataType}
        value={value.values}
        hideNoValue
      />
      <TypeSection
        title="data"
        component={KeyValuePairType}
        value={value.data}
        hideNoValue
      />
      <TypeSection
        title="floatRestriction"
        value={value.floatRestriction}
        component={MetadataFieldFloatType}
        hideNoValue
      />
      <TypeSection
        title="integerRestriction"
        value={value.integerRestriction}
        component={MetadataFieldIntegerType}
        hideNoValue
      />
      <TypeSection
        title="longRestriction"
        value={value.longRestriction}
        component={MetadataFieldLongType}
        hideNoValue
      />
      <TypeSection
        title="stringRestriction"
        value={value.stringRestriction}
        component={MetadataFieldStringType}
        hideNoValue
      />
      <TypeSection
        value={value.constraint}
        component={({ value: v = {} }) => (
          <>
            <TextGrid
              title="dataset"
              value={v.dataset}
            />
            <TextGrid
              title="levelProperty"
              value={v.levelProperty}
            />
            <TextGrid
              title="levelValue"
              value={v.levelValue}
            />
            <TextGrid
              title="value"
              value={v.value}
            />
            <TextGrid
              title="parent"
              value={v.parent}
            />
            <TextGrid
              title="validationGroup"
              value={v.validationGroup}
            />
          </>
        )}
      />
    </>
  );
}

export default MetadataFieldType;
