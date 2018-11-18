import React from 'react';

import TextGrid from '../ui/TextGrid';
import TypeArray from '../ui/TypeArray';
import TypeSection from '../ui/TypeSection';

import { SimpleMetadataType } from '../ui/DisplayType';

const StorageFileSequenceType = ({ value = {} }) => (
  <React.Fragment>
    <TextGrid
      title="regex"
      value={value.regex}
    />
    <TextGrid
      title="numGroup"
      value={value.numGroup}
    />
  </React.Fragment>
);

export const StorageMethodType = ({ value = {} }) => (
  <React.Fragment>
    <TextGrid
      title="id"
      value={value.id}
    />
    <TextGrid
      title="uri"
      value={value.uri}
    />
    <TextGrid
      title="read"
      variant="boolean"
      value={value.read}
    />
    <TextGrid
      title="write"
      variant="boolean"
      value={value.write}
    />
    <TextGrid
      title="browse"
      variant="boolean"
      value={value.browse}
    />
    <TextGrid
      title="lastSuccess"
      value={value.lastSuccess}
      variant="timestamp"
    />
    <TextGrid
      title="lastFailure"
      value={value.lastFailure}
      variant="timestamp"
    />
    <TextGrid
      title="bandwidth"
      value={value.value}
    />
    <TextGrid
      title="failureMessage"
      value={value.failureMessage}
    />
    <TextGrid
      title="type"
      value={value.type}
    />
    <TextGrid
      title="loc"
      value={value.loc}
    />
    <TypeArray
      title="metadata"
      value={value.metadata}
      component={SimpleMetadataType}
    />
  </React.Fragment>
);

const StorageSection = ({ value = {} }) => (
  <React.Fragment>
    <TextGrid
      title="id"
      value={value.id}
      hideNoValue
      hover
    />
    <TextGrid
      title="type"
      value={value.type}
      hideNoValue
      hover
    />
    <TextGrid
      title="state"
      value={value.state}
      hideNoValue
      hover
    />
    <TextGrid
      title="Last Scan"
      value={value.timestamp}
      variant="fromnow"
      hideNoValue
      hover
    />
    <TextGrid
      title="capacity"
      value={value.capacity}
      variant="bytes"
      hideNoValue
      hover
    />
    <TextGrid
      title="autoDetect"
      value={value.autoDetect}
      variant="boolean"
      hover
    />
    <TextGrid
      title="showImportables"
      value={value.showImportables}
      variant="boolean"
      hover
    />
    <TextGrid
      title="scanInterval"
      value={value.scanInterval}
      variant="seconds"
      hideNoValue
      hover
    />
  </React.Fragment>
);

export const StorageBasicDisplay = ({ value = {} }) => (
  <React.Fragment>
    <TypeSection
      component={StorageSection}
      value={value}
    />
  </React.Fragment>
);

const MethodSection = ({ value = {} }) => (
  <React.Fragment>
    <TypeArray
      title="method"
      titleKey="id"
      value={value.method}
      component={StorageMethodType}
    />
  </React.Fragment>
);

export const StorageMethodDisplay = ({ value = {} }) => (
  <React.Fragment>
    <TypeSection
      component={MethodSection}
      value={value}
    />
  </React.Fragment>
);

const AdvancedSection = ({ value = {} }) => (
  <React.Fragment>
    <TextGrid
      title="bandwidth"
      value={value.bandwidth}
      hover
    />
    <TextGrid
      title="lowWatermark"
      value={value.lowWatermark}
      variant="bytes"
      hover
    />
    <TextGrid
      title="highWatermark"
      value={value.highWatermark}
      variant="bytes"
      hover
    />
    <TextGrid
      title="lowWatermarkPercentage"
      value={value.lowWatermarkPercentage}
      hover
    />
    <TextGrid
      title="lowWatermarkPercentage"
      value={value.lowWatermarkPercentage}
      hover
    />
    <TextGrid
      title="bean"
      value={value.bean}
      hover
    />
    <TextGrid
      title="projection"
      value={value.projection}
      hover
    />
    <TypeArray
      title="sequence"
      value={value.sequence}
      component={StorageFileSequenceType}
      hover
    />
    <TextGrid
      title="sequenceTimeout"
      value={value.sequenceTimeout}
      hover
    />
  </React.Fragment>
);

export const StorageAdvancedDisplay = ({ value = {} }) => (
  <React.Fragment>
    <TypeSection
      component={AdvancedSection}
      value={value}
    />
  </React.Fragment>
);

const MetadataSection = ({ value = {} }) => (
  <React.Fragment>
    <TypeSection
      value={value.metadata}
      component={SimpleMetadataType}
    />
  </React.Fragment>
);

export const StorageMetadataDisplay = ({ value = {} }) => (
  <React.Fragment>
    <TypeSection
      component={MetadataSection}
      value={value}
    />
  </React.Fragment>
);

const ScriptSection = ({ value = {} }) => (
  <React.Fragment>
    <TextGrid
      title="archiveScript"
      value={value.archiveScript}
      variant="code"
      hideNoValue
    />
  </React.Fragment>
);

export const StorageScriptDisplay = ({ value = {} }) => (
  <React.Fragment>
    <TypeSection
      component={ScriptSection}
      value={value}
    />
  </React.Fragment>
);


export default function StorageDisplay({
  value,
}) {
  return (
    <React.Fragment>
      <TypeSection
        value={value}
        component={StorageSection}
      />
      <TypeSection
        value={value}
        component={MethodSection}
      />
      <TypeSection
        value={value}
        component={AdvancedSection}
      />
      <TypeSection
        value={value}
        component={MetadataSection}
      />
      <TypeSection
        value={value}
        component={ScriptSection}
      />
    </React.Fragment>
  );
}
