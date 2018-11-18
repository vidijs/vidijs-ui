import React from 'react';

import TextGrid from '../ui/TextGrid';
import TypeSection from '../ui/TypeSection';
import TypeArray from '../ui/TypeArray';

const StorageRuleType = ({ value = {} }) => (
  <React.Fragment>
    <TextGrid
      title="storageCount"
      value={value.storageCount}
      hover
      hideNoValue
    />
    <TypeArray
      title="priority"
      value={value.priority}
      component={v => (
        <React.Fragment>
          <TextGrid
            title="value"
            value={v.value}
            hover
          />
          <TextGrid
            title="level"
            value={v.value}
            hover
          />
        </React.Fragment>
      )}
      hideNoValue
    />
    <TextGrid
      title="inherited"
      value={value.inherited}
      variant="boolean"
      hover
      hideNoValue
    />
    <TextGrid
      title="storage"
      value={value.storage}
      variant="storageId"
      hover
      hideNoValue
    />
    <TextGrid
      title="Storage Group"
      value={value.storage}
      hover
      hideNoValue
    />
    <TypeSection
      title="not"
      value={value.priority}
      component={v => (
        <React.Fragment>
          <TextGrid
            title="storage"
            value={v.storage}
            variant="storageId"
            hover
          />
          <TextGrid
            title="Storage Group"
            value={v.storage}
            hover
          />
        </React.Fragment>
      )}
      hideNoValue
    />
    <TypeSection
      title="pool"
      value={value.priority}
      component={v => (
        <React.Fragment>
          <TextGrid
            title="storage"
            value={v.storage}
            variant="storageId"
            hover
          />
          <TextGrid
            title="Storage Group"
            value={v.storage}
            hover
          />
        </React.Fragment>
      )}
      hideNoValue
    />
    <TypeSection
      title="appliesTo"
      value={value.priority}
      component={v => (
        <React.Fragment>
          <TextGrid
            title="id"
            value={v.id}
            hover
          />
          <TextGrid
            title="type"
            value={v.type}
            hover
          />
        </React.Fragment>
      )}
      hideNoValue
    />
    <TextGrid
      title="precedence"
      value={value.precedence}
      hover
      hideNoValue
    />
  </React.Fragment>
);

export default function StorageRuleDisplay({
  storageRuleDocument,
}) {
  return (
    <React.Fragment>
      <TypeSection
        component={StorageRuleType}
        value={storageRuleDocument}
      />
    </React.Fragment>
  );
}
