import React from 'react';

import UnstyledLink from '../ui/UnstyledLink';
import TableCell from '../ui/TableCell';
import TableRow from '../ui/TableRow';

export default function VxaRow({
  vxaDocument = {},
}) {
  return (
    <TableRow to={`/vxa/${vxaDocument.uuid}/`} hover>
      <TableCell>
        <UnstyledLink to={`/vxa/${vxaDocument.uuid}/`}>
          {vxaDocument.uuid}
        </UnstyledLink>
      </TableCell>
    </TableRow>
  );
}
