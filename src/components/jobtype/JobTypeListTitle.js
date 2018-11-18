import React from 'react';

import TitleHeader from '../ui/TitleHeader';

export default function JobTypeListTitle(props) {
  return (
    <TitleHeader
      title="Job Type"
      helpTo="/ref/job.html#job-types"
      {...props}
    />
  );
}
