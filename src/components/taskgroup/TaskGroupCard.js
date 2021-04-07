import React from 'react';

import SquareCard from '../ui/SquareCard';
import TaskGroupEditor from './TaskGroupEditor';
import SimpleMetadataGrid from '../ui/SimpleMetadataGrid';

export default function TaskGroupCard({
  groupName,
  taskGroupDocument,
  onRefresh,
}) {
  const { metadata: simpleMetadataList = {} } = taskGroupDocument;
  return (
    <>
      <SquareCard>
        <TaskGroupEditor
          groupName={groupName}
          taskGroupDocument={taskGroupDocument}
          onRefresh={onRefresh}
        />
      </SquareCard>
      {simpleMetadataList
      && (
      <SquareCard>
        <SimpleMetadataGrid
          simpleMetadataList={simpleMetadataList.field}
          entityType="task-group"
          entityId={groupName}
          onSuccess={onRefresh}
          editable
        />
      </SquareCard>
      )}
    </>
  );
}
