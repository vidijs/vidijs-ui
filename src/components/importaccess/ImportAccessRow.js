import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

import Menu, { MenuItem } from '../ui/Menu';
import UnstyledLink from '../ui/UnstyledLink';

export default function ImportAccessRow({
  group,
  openRemove,
  openEdit,
}) {
  return (
    <TableRow hover>
      <TableCell>
        <UnstyledLink to={`/group/${group.name}`}>
          {group.name}
        </UnstyledLink>
      </TableCell>
      <TableCell>{group.permission}</TableCell>
      <TableCell numeric onClick={(e) => e.stopPropagation()}>
        <Menu>
          <MenuItem onClick={openEdit(group)}>
            <Typography color="inherit">Edit</Typography>
          </MenuItem>
          <MenuItem onClick={openRemove(group)}>
            <Typography color="error">Remove</Typography>
          </MenuItem>
        </Menu>
      </TableCell>
    </TableRow>
  );
}
