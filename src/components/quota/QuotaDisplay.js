import React from 'react';
import Divider from '@material-ui/core/Divider';
import LinearProgress from '@material-ui/core/LinearProgress';

import TextGrid from '../ui/TextGrid';

export const QuotaRuleType = ({ rule }) => (
  <>
    { rule.user
      && <TextGrid title="User" variant="username" value={rule.user} />}
    { rule.group
      && <TextGrid title="Group" variant="group" value={rule.group} />}
    { rule.collection
      && <TextGrid title="Collection" variant="collection" value={rule.collection} />}
    { rule.library
      && <TextGrid title="Library" variant="library" value={rule.library} />}
    { rule.tag
      && <TextGrid title="Shape Tag" variant="shape-tag" value={rule.tag} />}
    { rule.storage
      && <TextGrid title="Storage" variant="storageId" value={rule.storage} />}
    { rule.storageGroup
      && <TextGrid title="Storage Group" value={rule.storageGroup} />}
    { rule.resource
      && (
      <>
        {rule.resource.map((resource) => (
          <React.Fragment
            key={resource.name}
          >
            <Divider />
            <TextGrid title="Resource Name" value={resource.name} />
            <TextGrid title="Resource Limit" value={resource.limit} />
            <TextGrid title="Resource Usage" value={resource.usage} />
            <LinearProgress variant="determinate" value={(resource.usage / resource.limit) * 100} />

          </React.Fragment>
        ))}
        <Divider />
      </>
      )}
    <TextGrid title="Description" value={rule.description} />
    <TextGrid title="Update Frequency" value={rule.updateFrequency} />
    <TextGrid title="Last Update" variant="timestamp" value={rule.lastUpdate} />
  </>
);

export default function QuotaRuleDisplay({
  quotaRuleDocument,
}) {
  return (
    <QuotaRuleType
      rule={quotaRuleDocument}
    />
  );
}
