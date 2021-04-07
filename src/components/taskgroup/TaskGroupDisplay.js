import React from 'react';
import Divider from '@material-ui/core/Divider';

import TextGrid from '../ui/TextGrid';

export const TaskGroupType = ({ group }) => (
  <>
    { group.priority
      && <TextGrid title="Priority" value={group.priority} />}
    { group.job
      && (
      <>
        {group.job.map((job) => (
          <React.Fragment
            key={job.type}
          >
            <Divider />
            <TextGrid title="Job Type" variant="list" value={job.type} />
            <TextGrid title="Job Priority" variant="list" value={job.priority} />
            <TextGrid title="Job User" variant="list" value={job.user} />
            <TextGrid title="Job Group" variant="list" value={job.group} />
          </React.Fragment>
        ))}
        <Divider />
      </>
      )}
    { group.transcoder
      && (
      <>
        {group.transcoder.map((transcoder) => (
          <React.Fragment key={transcoder.id}>
            <Divider />
            <TextGrid title="Transcoder" value={transcoder.id} />
          </React.Fragment>
        ))}
        <Divider />
      </>
      )}
  </>
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
