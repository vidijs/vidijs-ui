import React from 'react';
import DeleteForever from '@material-ui/icons/DeleteForever';
import Edit from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Moment from 'react-moment';

import TableCell from '../../ui/TableCell';
import TableRow from '../../ui/TableRow';


export default function PropertiesRow({
  configurationPropertyDocument = {},
  onRemove,
  onEdit,
}) {
  return (
    <React.Fragment>
      <TableRow hover >
        <TableCell>{configurationPropertyDocument.key}</TableCell>
        <TableCell>
          <Typography noWrap>
            {configurationPropertyDocument.value}
          </Typography>
        </TableCell>
        <TableCell>
          <Moment fromNow date={configurationPropertyDocument.lastChange} />
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
    </React.Fragment>
  );
}
