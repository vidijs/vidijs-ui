import React from 'react';
import TableCell from '@material-ui/core/TableCell';

import TableRowLink from '../ui/TableRowLink';
import UnstyledLink from '../ui/UnstyledLink';

export default function StorageGroupRow({
  storageGroup,
}) {
  const { name: groupName } = storageGroup;
  return (
    <TableRowLink hover to={`/storage-group/${groupName}/`}>
      <TableCell>
        <UnstyledLink to={`/storage-group/${groupName}/`}>
          {groupName}
        </UnstyledLink>
      </TableCell>
    </TableRowLink>
  );
}
