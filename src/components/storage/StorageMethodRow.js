import React from 'react';
import moment from 'moment';
import TableCell from '@material-ui/core/TableCell';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import TableRowLink from '../ui/TableRowLink';

import { OnlineIcon, OfflineIcon } from '../ui/StatusIcon';

export default function StorageMethodRow({
  storageMethod,
  storageId,
}) {
  let isOnline = false;
  if (!storageMethod.lastFailure) {
    isOnline = true;
  } else if (storageMethod.lastSuccess && storageMethod.lastFailure) {
    isOnline = moment(storageMethod.lastSuccess).isAfter(storageMethod.lastFailure);
  }
  return (
    <TableRowLink hover to={`/storage/${storageId}/method/${storageMethod.id}`}>
      <TableCell>{storageMethod.id}</TableCell>
      <TableCell>{storageMethod.uri}</TableCell>
      <TableCell padding="checkbox">
        <FormGroup row>
          <FormControlLabel
            control={(
              <Checkbox
                checked={storageMethod.read}
                disabled
              />
            )}
            label={<Typography variant="subtitle2">Read</Typography>}
          />
          <FormControlLabel
            control={(
              <Checkbox
                checked={storageMethod.write}
                disabled
              />
            )}
            label={<Typography variant="subtitle2">Write</Typography>}
          />
          <FormControlLabel
            control={(
              <Checkbox
                checked={storageMethod.browse}
                disabled
              />
            )}
            label={<Typography variant="subtitle2">Browse</Typography>}
          />
        </FormGroup>
      </TableCell>
      <TableCell>
        {isOnline ? <OnlineIcon /> : <OfflineIcon />}
      </TableCell>
    </TableRowLink>
  );
}
