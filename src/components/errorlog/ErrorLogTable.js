import React from 'react';

import Table from '../ui/Table';
import TableBody from '../ui/TableBody';
import TableCell from '../ui/TableCell';
import TableHead from '../ui/TableHead';
import TableRow from '../ui/TableRow';
import ErrorLogRow from './ErrorLogRow';

export default function ErrorLogTable({
  errorLogListDocument = {},
}) {
  const { errorLog: errorLogList = [] } = errorLogListDocument;
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Timestamp</TableCell>
          <TableCell>ID</TableCell>
          <TableCell>Type</TableCell>
          <TableCell>Entity Type</TableCell>
          <TableCell>Entity ID</TableCell>
          <TableCell>Description</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {errorLogList.map((errorLogDocument) => (
          <ErrorLogRow
            key={errorLogDocument.id}
            errorLogDocument={errorLogDocument}
          />
        ))}
      </TableBody>
    </Table>
  );
}
