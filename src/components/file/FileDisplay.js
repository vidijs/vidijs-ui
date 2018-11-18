import React from 'react';

import TextGrid from '../ui/TextGrid';
import TypeSection from '../ui/TypeSection';
import TypeArray from '../ui/TypeArray';
import TextGridArray from '../ui/TextGridArray';
import { SimpleMetadataType } from '../ui/SimpleMetadataDisplay';


const BasicSection = ({ value = {} }) => (
  <React.Fragment>
    <TextGrid
      title="id"
      value={value.id}
      hover
    />
    <TextGrid
      title="path"
      value={value.path}
      hideNoValue
      hover
    />
    <TextGridArray
      title="uri"
      value={value.uri}
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
      title="size"
      value={value.size}
      variant="bytes"
      hideNoValue
      hover
    />
    <TextGrid
      title="hash"
      value={value.hash}
      hideNoValue
      hover
    />
    <TextGrid
      title="timestamp"
      value={value.timestamp}
      variant="timestamp"
      hideNoValue
      hover
    />
    <TextGrid
      title="refreshFlag"
      value={value.refreshFlag}
      hideNoValue
      hover
    />
    <TextGrid
      title="sequence"
      value={value.sequence}
      hideNoValue
      hover
    />
    <TextGrid
      title="storage"
      value={value.storage}
      variant="storageId"
      hideNoValue
      hover
    />
    {/* <TypeSection
      title="storageDefinition"
      value={value.storageDefinition}
      component={StorageType}
    /> */}
    <TypeArray
      value={value.item}
      component={({ value: v }) => (
        <React.Fragment>
          <TextGrid
            title="item"
            value={v.id}
            variant="itemId"
          />
          <TypeArray
            value={v.shape}
            component={({ value: x }) => (
              <React.Fragment>
                <TextGrid
                  title="shape"
                  value={x.id}
                />
                <TypeArray
                  value={x.component}
                  component={({ value: y }) => (
                    <React.Fragment>
                      <TextGrid
                        title="component"
                        value={y.id}
                        hideNoValue
                      />
                    </React.Fragment>
                  )}
                  hideNoValue
                />
              </React.Fragment>
            )}
            hideNoValue
          />
        </React.Fragment>
      )}
      hideNoValue
      hover
      dense
    />
    <TypeArray
      title="range"
      value={value.range}
      component={({ value: v }) => (
        <React.Fragment>
          <TextGrid
            title="start"
            value={v.start}
          />
          <TextGrid
            title="count"
            value={v.count}
          />
        </React.Fragment>
      )}
      hideNoValue
      hover
    />
    <TextGrid
      title="type"
      value={value.type}
      hideNoValue
      hover
    />
  </React.Fragment>
);

const FileType = ({ value = {} }) => (
  <React.Fragment>
    <TypeSection
      component={BasicSection}
      value={value}
    />
    <TypeSection
      title="metadata"
      value={value.metadata}
      component={SimpleMetadataType}
      hideNoValue
    />
  </React.Fragment>
);

export const FileBasicDisplay = ({ fileDocument }) => (
  <React.Fragment>
    <TypeSection
      component={BasicSection}
      value={fileDocument}
    />
  </React.Fragment>
);

export default function FileDisplay({
  fileDocument,
}) {
  return (
    <React.Fragment>
      <TypeSection
        component={FileType}
        value={fileDocument}
      />
    </React.Fragment>
  );
}
