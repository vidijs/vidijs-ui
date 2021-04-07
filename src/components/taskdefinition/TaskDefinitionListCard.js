import React from 'react';

import TaskDefinitionCard from './TaskDefinitionCard';

export default function TaskDefinitionListCard({ taskDefinitionListDocument, ...props }) {
  const { task: taskList = [] } = taskDefinitionListDocument;
  return (
    taskList.map((taskDefinitionDocument) => (
      <TaskDefinitionCard
        key={taskDefinitionDocument.id}
        taskDefinitionDocument={taskDefinitionDocument}
        {...props}
      />
    ))
  );
}
