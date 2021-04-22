import React from 'react';

import Card from '@material-ui/core/Card';
import TaskDefinitionEditor from './TaskDefinitionEditor';

export default function TaskDefinitionCard(props) {
  return (
    <Card>
      <TaskDefinitionEditor
        {...props}
      />
    </Card>
  );
}
