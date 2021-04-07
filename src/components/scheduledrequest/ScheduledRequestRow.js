import React from 'react';
import moment from 'moment';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';

import TableCell from '../ui/TableCell';
import TableRow from '../ui/TableRow';

export default function ScheduledRequestRow({
  scheduledRequestType = {},
  onOpen,
  onRemove,
}) {
  return (
    <>
      <TableRow hover>
        <TableCell>{scheduledRequestType.id}</TableCell>
        <TableCell>{scheduledRequestType.user}</TableCell>
        <TableCell>{scheduledRequestType.state}</TableCell>
        <TableCell>{scheduledRequestType.created ? moment(scheduledRequestType.created).toString() : ''}</TableCell>
        <TableCell>{scheduledRequestType.date ? moment(scheduledRequestType.date).toString() : ''}</TableCell>
        <TableCell>{scheduledRequestType.executed ? moment(scheduledRequestType.executed).toString() : ''}</TableCell>
        <TableCell disableOnClick>
          <IconButton onClick={() => onOpen({ scheduledRequestType })}>
            <RemoveRedEyeIcon />
          </IconButton>
          <IconButton onClick={() => onRemove({ scheduledRequestType })}>
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    </>
  );
}
