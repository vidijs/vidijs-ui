import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import StorageMethodRow from './StorageMethodRow';

export default function StorageMethodListTable({
  storageDocument,
}) {
  const { method: storageMethodList, id: storageId } = storageDocument;
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>URI</TableCell>
          <TableCell padding="checkbox">Permissions</TableCell>
          <TableCell padding="checkbox" />
        </TableRow>
      </TableHead>
      <TableBody>
        {storageMethodList && storageMethodList.map((storageMethod) => (
          <StorageMethodRow
            key={storageMethod.id}
            storageMethod={storageMethod}
            storageId={storageId}
          />
        ))}
      </TableBody>
    </Table>
  );
}
