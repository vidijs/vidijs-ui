import React from 'react';

import TextGrid from '../ui/TextGrid';
import TypeSection from '../ui/TypeSection';
import TypeArray from '../ui/TypeArray';

const StorageRuleType = ({ value = {} }) => (
  <>
    <TextGrid
      title="storageCount"
      value={value.storageCount}
      hover
      hideNoValue
    />
    <TypeArray
      title="priority"
      value={value.priority}
      component={(v) => (
        <>
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
        </>
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
      component={(v) => (
        <>
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
        </>
      )}
      hideNoValue
    />
    <TypeSection
      title="pool"
      value={value.priority}
      component={(v) => (
        <>
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
        </>
      )}
      hideNoValue
    />
    <TypeSection
      title="appliesTo"
      value={value.priority}
      component={(v) => (
        <>
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
        </>
      )}
      hideNoValue
    />
    <TextGrid
      title="precedence"
      value={value.precedence}
      hover
      hideNoValue
    />
  </>
);

export default function StorageRuleDisplay({
  storageRuleDocument,
}) {
  return (
    <>
      <TypeSection
        component={StorageRuleType}
        value={storageRuleDocument}
      />
    </>
  );
}
