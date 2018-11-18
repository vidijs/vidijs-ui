import React from 'react';

import TextGrid from '../../ui/TextGrid';
import TypeSection from '../../ui/TypeSection';
import TypeArray from '../../ui/TypeArray';

const JobPoolType = ({ value = {} }) => (
  <React.Fragment>
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
  </React.Fragment>
);

const JobPoolListType = ({ value = {} }) => (
  <React.Fragment>
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
  </React.Fragment>
);

export default function JobPoolDisplay({
  jobPoolListDocument,
}) {
  return (
    <React.Fragment>
      <TypeSection
        value={jobPoolListDocument}
        component={JobPoolListType}
      />
    </React.Fragment>
  );
}
