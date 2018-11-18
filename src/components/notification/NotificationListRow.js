import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRowLink from '../ui/TableRowLink';
import UnstyledLink from '../ui/UnstyledLink';

export default function NotificationListRow({
  notification,
  entityType,
}) {
  const notificationPath = new URL(notification).pathname;
  const notificationId = notificationPath.split('/').pop();
  return (
    <TableRowLink hover to={`/notification/${entityType}/${notificationId}/`}>
      <TableCell>
        <UnstyledLink to={`/notification/${entityType}/${notificationId}/`}>
          {notificationId}
        </UnstyledLink>
      </TableCell>
      <TableCell />
    </TableRowLink>
  );
}
