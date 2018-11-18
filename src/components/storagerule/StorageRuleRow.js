import React from 'react';
import Check from '@material-ui/icons/Check';
import DeleteForever from '@material-ui/icons/DeleteForever';
import IconButton from '@material-ui/core/IconButton';

import TableCell from '../ui/TableCell';
import TableRow from '../ui/TableRow';
import ChipArray from '../ui/ChipArray';

export default function StorageRuleRow({
  storageRuleDocument,
  onRemove,
}) {
  return (
    <TableRow hover>
      <TableCell>{storageRuleDocument.appliesTo.id}</TableCell>
      <TableCell>{storageRuleDocument.appliesTo.type}</TableCell>
      <TableCell>{storageRuleDocument.id}</TableCell>
      <TableCell>{storageRuleDocument.storageCount}</TableCell>
      <TableCell><ChipArray labels={storageRuleDocument.storage} /></TableCell>
      <TableCell>{storageRuleDocument.precedence}</TableCell>
      <TableCell>{storageRuleDocument.inherited === true && <Check />}</TableCell>
      <TableCell disableOnClick>
        <IconButton onClick={() => onRemove({ storageRuleDocument })}>
          <DeleteForever />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
