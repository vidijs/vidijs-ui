import React from 'react';
import CardContent from '@material-ui/core/CardContent';

import SquareCard from '../ui/SquareCard';
import TaskGroupTable from './TaskGroupTable';

export default function TaskGroupListCard({
  taskGroupListDocument,
}) {
  return (
    <SquareCard>
      <CardContent>
        <TaskGroupTable
          taskGroupListDocument={taskGroupListDocument}
        />
      </CardContent>
    </SquareCard>
  );
}
