import React from 'react';

import TitleHeader from '../ui/TitleHeader';

export default function AuditLogTitle(props) {
  return (
    <TitleHeader
      title="Audit Log"
      helpTo="/ref/audit-trail.html"
      {...props}
    />
  );
}
