import React from 'react';
import DeleteForever from '@material-ui/icons/DeleteForever';
import Edit from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';

import TableCell from '../../ui/TableCell';
import TableRow from '../../ui/TableRow';

export default function PropertiesRow({
  configurationPropertyDocument = {},
  onRemove,
  onEdit,
}) {
  return (
    <>
      <TableRow hover>
        <TableCell>{configurationPropertyDocument.key}</TableCell>
        <TableCell>
          <Typography noWrap>
            {configurationPropertyDocument.value}
          </Typography>
        </TableCell>
        <TableCell>
          {configurationPropertyDocument.lastChange ? moment(configurationPropertyDocument.lastChange).fromNow().toString() : ''}
        </TableCell>
        <TableCell disableOnClick>
          <IconButton onClick={() => onRemove({ propertyKey: configurationPropertyDocument.key })}>
            <DeleteForever />
          </IconButton>
          <IconButton onClick={() => onEdit({ configurationPropertyDocument })}>
            <Edit />
          </IconButton>
        </TableCell>
      </TableRow>
    </>
  );
}
