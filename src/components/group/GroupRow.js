import React from 'react';
import Check from '@material-ui/icons/Check';
import DeleteForever from '@material-ui/icons/DeleteForever';
import IconButton from '@material-ui/core/IconButton';

import UnstyledLink from '../ui/UnstyledLink';
import TableCell from '../ui/TableCell';
import TableRow from '../ui/TableRow';

export default function GroupRow({
  groupDocument = {},
  onRemove,
}) {
  return (
    <TableRow to={`/group/${groupDocument.groupName}/`} hover>
      <TableCell>
        <UnstyledLink to={`/group/${groupDocument.groupName}/`}>
          {groupDocument.groupName}
        </UnstyledLink>
      </TableCell>
      <TableCell>{groupDocument.role && <Check />}</TableCell>
      <TableCell disableOnClick>
        {onRemove
        && (
        <IconButton onClick={() => onRemove({ groupName: groupDocument.groupName })}>
          <DeleteForever />
        </IconButton>
        )}
      </TableCell>
    </TableRow>
  );
}
