import React from 'react';
import Check from '@material-ui/icons/Check';
import DeleteForever from '@material-ui/icons/DeleteForever';
import IconButton from '@material-ui/core/IconButton';

import UnstyledLink from '../ui/UnstyledLink';
import TableCell from '../ui/TableCell';
import TableRow from '../ui/TableRow';

export default function UserRow({
  userDocument = {},
  onRemove,
}) {
  return (
    <TableRow to={`/user/${userDocument.userName}/`} hover>
      <TableCell>
        <UnstyledLink to={`/user/${userDocument.userName}/`}>
          {userDocument.userName}
        </UnstyledLink>
      </TableCell>
      <TableCell>{userDocument.realName}</TableCell>
      <TableCell>{userDocument.disabled && <Check />}</TableCell>
      <TableCell disableOnClick>
        {onRemove
        && (
        <IconButton onClick={() => onRemove({ userName: userDocument.userName })}>
          <DeleteForever />
        </IconButton>
        )}
      </TableCell>
    </TableRow>
  );
}
