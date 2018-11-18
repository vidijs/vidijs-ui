import React from 'react';
import DeleteForever from '@material-ui/icons/DeleteForever';
import IconButton from '@material-ui/core/IconButton';

import TableCell from '../ui/TableCell';
import TableRow from '../ui/TableRow';

export default function ExternalIdRow({
  externalIdentifierDocument = {},
  onRemove,
}) {
  return (
    <TableRow hover>
      <TableCell>{externalIdentifierDocument.externalId}</TableCell>
      <TableCell>{externalIdentifierDocument.namespace}</TableCell>
      <TableCell>{externalIdentifierDocument.entityId}</TableCell>
      <TableCell>{externalIdentifierDocument.entityType}</TableCell>
      <TableCell disableOnClick>
        <IconButton onClick={() => onRemove({ externalIdentifierDocument })}>
          <DeleteForever />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
