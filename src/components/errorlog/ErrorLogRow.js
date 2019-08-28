import React from 'react';
import moment from 'moment';

import TableCell from '../ui/TableCell';
import TableRow from '../ui/TableRow';

export default function ErrorLogRow({
  errorLogDocument = {},
}) {
  return (
    <TableRow hover>
      <TableCell>
        {errorLogDocument.timestamp ? moment(errorLogDocument.timestamp).format('YYYY-MM-DD HH:mm').toString() : ''}
      </TableCell>
      <TableCell>{errorLogDocument.id}</TableCell>
      <TableCell>{errorLogDocument.type}</TableCell>
      <TableCell>{errorLogDocument.entityType}</TableCell>
      <TableCell>{errorLogDocument.entityId}</TableCell>
      <TableCell>{errorLogDocument.description}</TableCell>
    </TableRow>
  );
}
