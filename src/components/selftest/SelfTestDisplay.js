import React from 'react';

import TextGrid from '../ui/TextGrid';
import TypeSection from '../ui/TypeSection';
import TypeArray from '../ui/TypeArray';
import TextGridArray from '../ui/TextGridArray';

export const SelfTestType = ({ value = {} }) => (
  <>
    <TextGrid
      title="name"
      value={value.name}
      hover
      hideNoValue
    />
    <TextGrid
      title="description"
      value={value.description}
      hover
      hideNoValue
    />
    <TextGrid
      title="status"
      value={value.status}
      hover
      hideNoValue
    />
    <TextGrid
      title="took"
      value={value.took}
      hover
      hideNoValue
    />
    <TextGridArray
      title="message"
      value={value.message}
      hover
      hideNoValue
    />
    <TypeArray
      title="test"
      value={value.test}
      component={SelfTestType}
      titleKey="name"
      hideNoValue
    />
  </>
);

export default function SelfTestDisplay({
  selfTestDocument,
}) {
  return (
    <>
      <TypeSection
        component={SelfTestType}
        value={selfTestDocument}
      />
    </>
  );
}
