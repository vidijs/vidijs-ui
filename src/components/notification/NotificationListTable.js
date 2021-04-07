import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import NotificationListRow from './NotificationListRow';

export default function NotificationListTable({
  notificationList = [],
  entityType,
}) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell />
        </TableRow>
      </TableHead>
      <TableBody>
        {notificationList.map((notification) => (
          <NotificationListRow
            key={notification}
            notification={notification}
            entityType={entityType}
          />
        ))}
      </TableBody>
    </Table>
  );
}
