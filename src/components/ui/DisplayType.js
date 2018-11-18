import React from 'react';

import TextGrid from './TextGrid';
import TypeArray from './TypeArray';
import TypeSection from './TypeSection';

export const SimpleMetadataType = ({ value: v = {}, dense = true }) => (
  <React.Fragment>
    <TypeArray
      title={dense ? undefined : 'field'}
      value={v.field}
      component={({ value = {} }) => (
        dense ?
          <TextGrid
            title={value.key}
            value={value.value}
            hover
            hideNoValue
            titleStartCase={false}
          />
          :
          <React.Fragment>
            <TextGrid
              title="key"
              value={value.key}
            />
            <TextGrid
              title="value"
              value={value.value}
            />
          </React.Fragment>
      )}
    />
  </React.Fragment>
);

export const KeyValuePairType = ({ value = {}, dense = true }) => (
  dense ?
    <TextGrid
      title={value.key}
      value={value.value}
      hover
      hideNoValue
      titleStartCase={false}
    />
    :
    <React.Fragment>
      <TextGrid
        title="key"
        value={value.key}
      />
      <TextGrid
        title="value"
        value={value.value}
      />
    </React.Fragment>
);

export const RationalType = ({ value = {} }) => (
  <React.Fragment>
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
  </React.Fragment>
);

export const TimeBaseType = RationalType;

export const TimeCodeType = ({ value = {} }) => (
  <React.Fragment>
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
  </React.Fragment>
);

export const ResolutionType = ({ value = {} }) => (
  <React.Fragment>
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
  </React.Fragment>
);

export const AspectRatioType = ({ value = {} }) => (
  <React.Fragment>
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
  </React.Fragment>
);

export const TimeIntervalType = ({ value = {} }) => (
  <React.Fragment>
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
  </React.Fragment>
);
