import React from 'react';
import moment from 'moment';

import UnstyledLink from '../ui/UnstyledLink';
import TableCell from '../ui/TableCell';
import TableRow from '../ui/TableRow';

export default function AuditLogRow({
  entry = {},
}) {
  return (
    <TableRow hover>
      <TableCell>{entry.timestamp ? moment(entry.timestamp) : ''}</TableCell>
      <TableCell>
        <UnstyledLink to={`/username/${entry.username}/`}>
          {entry.username}
        </UnstyledLink>
      </TableCell>
      <TableCell>{entry.method}</TableCell>
      <TableCell>{entry.path}</TableCell>
      <TableCell>{entry.queryParameters}</TableCell>
      <TableCell>{entry.matrixParameters}</TableCell>
    </TableRow>
  );
}
