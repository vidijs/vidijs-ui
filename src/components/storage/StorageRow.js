import React from 'react';
import TableCell from '@material-ui/core/TableCell';

import TableRowLink from '../ui/TableRowLink';
import UnstyledLink from '../ui/UnstyledLink';

export default function StorageRow({
  storageDocument,
}) {
  const { id: storageId } = storageDocument;
  return (
    <TableRowLink hover to={`/storage/${storageId}/`}>
      <TableCell>
        <UnstyledLink to={`/storage/${storageId}/`}>
          {storageId}
        </UnstyledLink>
      </TableCell>
    </TableRowLink>
  );
}
