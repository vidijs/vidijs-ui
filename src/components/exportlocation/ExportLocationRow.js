import React from 'react';

import UnstyledLink from '../ui/UnstyledLink';
import TableCell from '../ui/TableCell';
import TableRow from '../ui/TableRow';

export default function ExportLocationRow({
  exportLocationDocument = {},
}) {
  return (
    <TableRow to={`/export-location/${exportLocationDocument.name}/`} hover>
      <TableCell>
        <UnstyledLink to={`/export-location/${exportLocationDocument.name}/`}>
          {exportLocationDocument.name}
        </UnstyledLink>
      </TableCell>
    </TableRow>
  );
}
