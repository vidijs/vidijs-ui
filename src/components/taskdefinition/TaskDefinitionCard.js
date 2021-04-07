import React from 'react';

import SquareCard from '../ui/SquareCard';
import TaskDefinitionEditor from './TaskDefinitionEditor';

export default function TaskDefinitionCard(props) {
  return (
    <>
      <SquareCard>
        <TaskDefinitionEditor
          {...props}
        />
      </SquareCard>
    </>
  );
}
