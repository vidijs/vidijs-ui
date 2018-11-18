import React from 'react';
import Moment from 'react-moment';

import TableCell from '../ui/TableCell';
import TableRow from '../ui/TableRow';

export default function ErrorLogRow({
  errorLogDocument = {},
}) {
  return (
    <TableRow hover>
      <TableCell>
        <Moment format="YYYY-MM-DD HH:mm" date={errorLogDocument.timestamp} />
      </TableCell>
      <TableCell>{errorLogDocument.id}</TableCell>
      <TableCell>{errorLogDocument.type}</TableCell>
      <TableCell>{errorLogDocument.entityType}</TableCell>
      <TableCell>{errorLogDocument.entityId}</TableCell>
      <TableCell>{errorLogDocument.description}</TableCell>
    </TableRow>
  );
}
