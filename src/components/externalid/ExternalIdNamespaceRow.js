import React from 'react';
import DeleteForever from '@material-ui/icons/DeleteForever';
import Edit from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';

import TableCell from '../ui/TableCell';
import TableRow from '../ui/TableRow';

export default function ExternalIdNamespaceRow({
  externalIdentifierNamespaceDocument = {},
  onEdit,
  onRemove,
}) {
  return (
    <TableRow hover>
      <TableCell>{externalIdentifierNamespaceDocument.name}</TableCell>
      <TableCell>{externalIdentifierNamespaceDocument.pattern}</TableCell>
      <TableCell>{externalIdentifierNamespaceDocument.priority}</TableCell>
      <TableCell disableOnClick>
        <IconButton onClick={() => onRemove({ externalIdentifierNamespaceDocument })}>
          <DeleteForever />
        </IconButton>
        <IconButton onClick={() => onEdit({ externalIdentifierNamespaceDocument })}>
          <Edit />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
