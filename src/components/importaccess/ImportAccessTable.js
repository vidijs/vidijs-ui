import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import ImportAccessRow from './ImportAccessRow';

export default function ImportAccessTable({
  importAccessControlListDocument = {},
  openRemove,
  openEdit,
}) {
  const { group: groupList = [] } = importAccessControlListDocument;
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Group</TableCell>
          <TableCell>Permission</TableCell>
          <TableCell />
        </TableRow>
      </TableHead>
      <TableBody>
        {groupList.map((group) => (
          <ImportAccessRow
            key={group.name}
            group={group}
            openRemove={openRemove}
            openEdit={openEdit}
          />
        ))}
      </TableBody>
    </Table>
  );
}
