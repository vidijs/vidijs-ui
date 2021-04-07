import React from 'react';

import TextGrid from '../ui/TextGrid';

export const AccessControlMergedType = ({ access }) => (
  <>
    <TextGrid title="Permission" value={access.permission} />
    <TextGrid title="Type" value={access.type} />
    <TextGrid title="Priority" value={access.priority} />
    { access.username
      && <TextGrid title="User" variant="username" value={access.username} />}
    { access.group
      && <TextGrid title="Group" variant="group" value={access.group} />}
    { access.grantor
      && <TextGrid title="Grantor" variant="username" value={access.grantor} />}
    { access.extradata
      && <TextGrid title="Extra Data" value={access.extradata} />}
    { access.collection
      && <TextGrid title="Collection" variant="collection" value={access.collection} />}
    { access.library
      && <TextGrid title="Library" variant="collection" value={access.library} />}
    { access.superUser
      && <TextGrid title="Super User" variant="boolean" value={access.superUser} />}
    { access.matches
      && <TextGrid title="Matches" variant="boolean" value={access.matches} />}
    { access.id
      && <TextGrid title="ID" value={access.id} />}
    { access.effectivePermission
      && <TextGrid title="Effective Permission" value={access.effectivePermission} />}
  </>
);

export default function AccessControlDisplay({
  accessControlDocument,
}) {
  return (
    <AccessControlMergedType
      access={accessControlDocument}
    />
  );
}
