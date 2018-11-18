import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

export default function PathAliasRow({
  pathAlias,
}) {
  return (
    <TableRow hover>
      <TableCell>{pathAlias}</TableCell>
      <TableCell />
    </TableRow>
  );
}
