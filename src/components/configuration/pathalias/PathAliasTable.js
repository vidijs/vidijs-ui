import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import PathAliasRow from './PathAliasRow';

export default function PathAliasTable({
  pathAliasConfigurationDocument,
}) {
  const { alias: pathAliasList = [] } = pathAliasConfigurationDocument;
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Alias</TableCell>
          <TableCell />
        </TableRow>
      </TableHead>
      <TableBody>
        {pathAliasList.map((pathAlias) => (
          <PathAliasRow
            key={pathAlias}
            pathAlias={pathAlias}
          />
        ))}
      </TableBody>
    </Table>
  );
}
