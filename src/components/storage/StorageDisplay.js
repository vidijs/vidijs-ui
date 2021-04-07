import React from 'react';

import TextGrid from '../ui/TextGrid';
import TypeArray from '../ui/TypeArray';
import TypeSection from '../ui/TypeSection';

import { SimpleMetadataType } from '../ui/DisplayType';

const StorageFileSequenceType = ({ value = {} }) => (
  <>
    <TextGrid
      title="regex"
      value={value.regex}
    />
    <TextGrid
      title="numGroup"
      value={value.numGroup}
    />
  </>
);

export const StorageMethodType = ({ value = {} }) => (
  <>
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
  </>
);

const StorageSection = ({ value = {} }) => (
  <>
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
  </>
);

export const StorageBasicDisplay = ({ value = {} }) => (
  <>
    <TypeSection
      component={StorageSection}
      value={value}
    />
  </>
);

const MethodSection = ({ value = {} }) => (
  <>
    <TypeArray
      title="method"
      titleKey="id"
      value={value.method}
      component={StorageMethodType}
    />
  </>
);

export const StorageMethodDisplay = ({ value = {} }) => (
  <>
    <TypeSection
      component={MethodSection}
      value={value}
    />
  </>
);

const AdvancedSection = ({ value = {} }) => (
  <>
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
  </>
);

export const StorageAdvancedDisplay = ({ value = {} }) => (
  <>
    <TypeSection
      component={AdvancedSection}
      value={value}
    />
  </>
);

const MetadataSection = ({ value = {} }) => (
  <>
    <TypeSection
      value={value.metadata}
      component={SimpleMetadataType}
    />
  </>
);

export const StorageMetadataDisplay = ({ value = {} }) => (
  <>
    <TypeSection
      component={MetadataSection}
      value={value}
    />
  </>
);

const ScriptSection = ({ value = {} }) => (
  <>
    <TextGrid
      title="archiveScript"
      value={value.archiveScript}
      variant="code"
      hideNoValue
    />
  </>
);

export const StorageScriptDisplay = ({ value = {} }) => (
  <>
    <TypeSection
      component={ScriptSection}
      value={value}
    />
  </>
);

export default function StorageDisplay({
  value,
}) {
  return (
    <>
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
    </>
  );
}
