import React from 'react';

import TextGrid from '../../ui/TextGrid';
import TypeSection from '../../ui/TypeSection';
import TypeArray from '../../ui/TypeArray';

const JobPoolType = ({ value = {} }) => (
  <>
    <TextGrid
      title="priorityThreshold"
      value={value.priorityThreshold}
      hover
    />
    <TextGrid
      title="size"
      value={value.size}
      hover
    />
  </>
);

const JobPoolListType = ({ value = {} }) => (
  <>
    <TextGrid
      title="concurrentJobs"
      value={value.concurrentJobs}
      hover
    />
    <TypeArray
      value={value.pool}
      component={JobPoolType}
      arrayTitle="Pools"
      dense
    />
  </>
);

export default function JobPoolDisplay({
  jobPoolListDocument,
}) {
  return (
    <>
      <TypeSection
        value={jobPoolListDocument}
        component={JobPoolListType}
      />
    </>
  );
}
