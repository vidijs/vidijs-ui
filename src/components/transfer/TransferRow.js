import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Edit from '@material-ui/icons/Edit';

import UnstyledLink from '../ui/UnstyledLink';
import TableCell from '../ui/TableCell';
import TableRow from '../ui/TableRow';
import { bytesToSize } from '../../utils';

export default function TransferRow({
  transferDocument = {},
  onOpen,
}) {
  return (
    <>
      <TableRow hover>
        <TableCell>{transferDocument.name}</TableCell>
        <TableCell>{transferDocument.state}</TableCell>
        <TableCell>{transferDocument.priority}</TableCell>
        <TableCell>{bytesToSize(transferDocument.transferred)}</TableCell>
        <TableCell>
          <UnstyledLink to={`/file/${transferDocument.fileId}/`}>
            {transferDocument.fileId}
          </UnstyledLink>
        </TableCell>
        <TableCell disableOnClick>
          { ['TRANSFERRING', 'WAITING'].includes(transferDocument.state)
          && (
          <IconButton onClick={() => onOpen({ transferDocument })}>
            <Edit />
          </IconButton>
          )}
        </TableCell>
      </TableRow>
    </>
  );
}
