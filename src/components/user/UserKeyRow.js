import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import DeleteForever from '@material-ui/icons/DeleteForever';

export default function UserKeyRow({
  accessKeyDocument = {},
  onOpenRemove,
}) {
  const {
    id: keyId,
    name,
    status,
    created,
  } = accessKeyDocument;
  return (
    <TableRow>
      <TableCell>{keyId}</TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>{created}</TableCell>
      <TableCell>{status}</TableCell>
      <TableCell>
        {onOpenRemove && (
        <IconButton onClick={() => onOpenRemove({ keyId })}>
          <DeleteForever />
        </IconButton>
        )}
      </TableCell>
    </TableRow>
  );
}
