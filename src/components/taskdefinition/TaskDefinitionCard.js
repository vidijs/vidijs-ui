import React from 'react';

import SquareCard from '../ui/SquareCard';
import TaskDefinitionEditor from './TaskDefinitionEditor';

export default function TaskDefinitionCard(props) {
  return (
    <React.Fragment>
      <SquareCard>
        <TaskDefinitionEditor
          {...props}
        />
      </SquareCard>
    </React.Fragment>
  );
}
