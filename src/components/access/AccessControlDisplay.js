import React from 'react';

import TextGrid from '../ui/TextGrid';

const AccessControlUriType = ({ uri }) => (
  <TextGrid title="URI Type" value={uri.type} />
);

const AccessControlShapeType = ({ shape }) => (
  <TextGrid title="Shape Tag" variant="shape-tag" value={shape.tag} />
);

const AccessControlMetadataType = ({ metadata }) => (
  <TextGrid title="Metadata Field" variant="metadata-field" value={metadata.field} />
);

export const AccessControlType = ({ access }) => (
  <>
    { access.user
      && <TextGrid title="User" variant="username" value={access.user} />}
    { access.group
      && <TextGrid title="Group" variant="group" value={access.group} />}
    <TextGrid title="Permission" value={access.permission} />
    <TextGrid title="Grantor" variant="username" value={access.grantor} />
    <TextGrid title="Recursive" variant="boolean" value={access.recursive} />
    <TextGrid title="Priority" value={access.priority} />
    { (access.operation && access.operation.uri)
      && <AccessControlUriType uri={access.operation.uri} />}
    { (access.operation && access.operation.shape)
      && <AccessControlShapeType shape={access.operation.shape} />}
    { (access.operation && access.operation.metadata)
      && <AccessControlMetadataType metadata={access.operation.metadata} />}
  </>
);

export default function AccessControlDisplay({
  accessControlDocument,
}) {
  return (
    <AccessControlType
      access={accessControlDocument}
    />
  );
}
