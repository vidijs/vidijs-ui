import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import StorageRow from './StorageRow';

export default function StorageListTable({
  storageListDocument = {},
}) {
  const { storage: storageList = [] } = storageListDocument;
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Storage ID</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {storageList.map((storageDocument) => (
          <StorageRow
            key={storageDocument.id}
            storageDocument={storageDocument}
          />
        ))}
      </TableBody>
    </Table>
  );
}
