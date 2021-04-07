import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import StorageGroupRow from './StorageGroupRow';

export default function StorageGroupListTable({
  storageGroupListDocument = {},
}) {
  const { group: storageGroupList = [] } = storageGroupListDocument;
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Storage Group Name</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {storageGroupList.map((storageGroup) => (
          <StorageGroupRow
            key={storageGroup.name}
            storageGroup={storageGroup}
          />
        ))}
      </TableBody>
    </Table>
  );
}
