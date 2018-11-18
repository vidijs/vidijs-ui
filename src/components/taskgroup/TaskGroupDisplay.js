import React from 'react';
import Divider from '@material-ui/core/Divider';

import TextGrid from '../ui/TextGrid';

export const TaskGroupType = ({ group }) => (
  <React.Fragment>
    { group.priority &&
      <TextGrid title="Priority" value={group.priority} />
    }
    { group.job &&
      <React.Fragment>
        {group.job.map((job, index) => (
          <React.Fragment
            key={index} // eslint-disable-line react/no-array-index-key
          >
            <Divider />
            <TextGrid title="Job Type" variant="list" value={job.type} />
            <TextGrid title="Job Priority" variant="list" value={job.priority} />
            <TextGrid title="Job User" variant="list" value={job.user} />
            <TextGrid title="Job Group" variant="list" value={job.group} />
          </React.Fragment>
      ))}
        <Divider />
      </React.Fragment>
    }
    { group.transcoder &&
      <React.Fragment>
        {group.transcoder.map(transcoder => (
          <React.Fragment key={transcoder.id}>
            <Divider />
            <TextGrid title="Transcoder" value={transcoder.id} />
          </React.Fragment>
        ))}
        <Divider />
      </React.Fragment>
  }
  </React.Fragment>
);

export default function TaskGroupDisplay({
  taskGroupDocument,
}) {
  return (
    <TaskGroupType
      group={taskGroupDocument}
    />
  );
}
