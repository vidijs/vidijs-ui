import React from 'react';

import TitleHeader from '../ui/TitleHeader';

export default function TaskDefinitionTitle(props) {
  return (
    <TitleHeader
      parentTitle="Job Type"
      parentTo="/jobtype/"
      title={props.taskDefinitionType}
      helpTo="/ref/task-definition.html"
      {...props}
    />
  );
}
