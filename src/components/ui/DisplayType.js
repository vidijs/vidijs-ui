import React from 'react';

import TextGrid from './TextGrid';
import TypeArray from './TypeArray';
import TypeSection from './TypeSection';

export const SimpleMetadataType = ({ value: v = {}, dense = true }) => (
  <>
    <TypeArray
      title={dense ? undefined : 'field'}
      value={v.field}
      component={({ value = {} }) => (
        dense
          ? (
            <TextGrid
              title={value.key}
              value={value.value}
              hover
              hideNoValue
              titleStartCase={false}
            />
          )
          : (
            <>
              <TextGrid
                title="key"
                value={value.key}
              />
              <TextGrid
                title="value"
                value={value.value}
              />
            </>
          )
      )}
    />
  </>
);

export const KeyValuePairType = ({ value = {}, dense = true }) => (
  dense
    ? (
      <TextGrid
        title={value.key}
        value={value.value}
        hover
        hideNoValue
        titleStartCase={false}
      />
    )
    : (
      <>
        <TextGrid
          title="key"
          value={value.key}
        />
        <TextGrid
          title="value"
          value={value.value}
        />
      </>
    )
);

export const RationalType = ({ value = {} }) => (
  <>
    <TextGrid
      title="numerator"
      value={value.numerator}
      hover
      hideNoValue
    />
    <TextGrid
      title="denominator"
      value={value.denominator}
      hover
      hideNoValue
    />
  </>
);

export const TimeBaseType = RationalType;

export const TimeCodeType = ({ value = {} }) => (
  <>
    <TextGrid
      title="samples"
      value={value.samples}
      hover
      hideNoValue
    />
    <TypeSection
      hideNoValue
      component={TimeBaseType}
      title="timeBase"
      value={value.timeBase}
    />
  </>
);

export const ResolutionType = ({ value = {} }) => (
  <>
    <TextGrid
      title="width"
      value={value.width}
      hover
      hideNoValue
    />
    <TextGrid
      title="height"
      value={value.height}
      hover
      hideNoValue
    />
  </>
);

export const AspectRatioType = ({ value = {} }) => (
  <>
    <TextGrid
      title="horizontal"
      value={value.horizontal}
      hover
      hideNoValue
    />
    <TextGrid
      title="vertical"
      value={value.vertical}
      hover
      hideNoValue
    />
  </>
);

export const TimeIntervalType = ({ value = {} }) => (
  <>
    <TypeSection
      hideNoValue
      title="start"
      component={TimeCodeType}
      value={value.start}
    />
    <TypeSection
      hideNoValue
      title="end"
      component={TimeCodeType}
      value={value.end}
    />
  </>
);
