import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRowLink from '../ui/TableRowLink';
import UnstyledLink from '../ui/UnstyledLink';

export default function TaskGroupRow({
  group,
}) {
  return (
    <TableRowLink hover to={`/task-group/${group.name}/`}>
      <TableCell>
        <UnstyledLink to={`/task-group/${group.name}/`}>
          {group.name}
        </UnstyledLink>
      </TableCell>
      <TableCell />
    </TableRowLink>
  );
}
