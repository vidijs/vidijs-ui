import React from 'react';

import Table from '../ui/Table';
import TableBody from '../ui/TableBody';
import TableCell from '../ui/TableCell';
import TableHead from '../ui/TableHead';
import TableRow from '../ui/TableRow';

import withDialogProps from '../../hoc/withDialogProps';
import ScheduledRequestRow from './ScheduledRequestRow';
import ScheduledRequestDialog from './ScheduledRequestDialog';
import ScheduledRequestRemove from './ScheduledRequestRemove';

const SCHEDULEDREQUEST_REMOVE_DIALOG = 'SCHEDULEDREQUEST_REMOVE_DIALOG';
const SCHEDULEDREQUEST_DETAIL_DIALOG = 'SCHEDULEDREQUEST_DETAIL_DIALOG';

function ScheduledRequestTable({
  scheduledRequestListDocument,
  onSuccess,
  dialogProps,
  onOpen,
}) {
  const { scheduledRequest: scheduledRequestListType = [] } = scheduledRequestListDocument;
  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>User</TableCell>
            <TableCell>State</TableCell>
            <TableCell>Created</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Executed</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {scheduledRequestListType.map((scheduledRequestType) => (
            <ScheduledRequestRow
              key={scheduledRequestType.id}
              scheduledRequestType={scheduledRequestType}
              onOpen={onOpen(SCHEDULEDREQUEST_DETAIL_DIALOG)}
              onRemove={onOpen(SCHEDULEDREQUEST_REMOVE_DIALOG)}
            />
          ))}
        </TableBody>
      </Table>
      <ScheduledRequestDialog
        {...dialogProps}
        dialogName={SCHEDULEDREQUEST_DETAIL_DIALOG}
      />
      <ScheduledRequestRemove
        {...dialogProps}
        dialogName={SCHEDULEDREQUEST_REMOVE_DIALOG}
        onSuccess={onSuccess}
      />
    </>
  );
}

export default withDialogProps(ScheduledRequestTable);
