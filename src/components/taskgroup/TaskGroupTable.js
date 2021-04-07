import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import TaskGroupRow from './TaskGroupRow';

export default function TaskGroupTable({
  taskGroupListDocument = {},
}) {
  const { group: groupList = [] } = taskGroupListDocument;
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell />
        </TableRow>
      </TableHead>
      <TableBody>
        {groupList.map((group) => (
          <TaskGroupRow
            key={group.name}
            group={group}
          />
        ))}
      </TableBody>
    </Table>
  );
}
