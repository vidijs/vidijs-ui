import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRowLink from '../ui/TableRowLink';
import UnstyledLink from '../ui/UnstyledLink';

export default function ProjectionListRow({
  projection,
}) {
  return (
    <TableRowLink hover to={`/projection/${projection}/`}>
      <TableCell>
        <UnstyledLink to={`/projection/${projection}/`}>
          {projection}
        </UnstyledLink>
      </TableCell>
      <TableCell />
    </TableRowLink>
  );
}
