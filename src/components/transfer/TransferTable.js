import React from 'react';

import Table from '../ui/Table';
import TableBody from '../ui/TableBody';
import TableCell from '../ui/TableCell';
import TableHead from '../ui/TableHead';
import TableRow from '../ui/TableRow';

import withDialogProps from '../../hoc/withDialogProps';
import TransferRow from './TransferRow';
import TransferPriority from './TransferPriority';

const TRANSFER_PRIORITY_DIALOG = 'TRANSFER_PRIORITY_DIALOG';

function TransferTable({
  transferListDocument,
  onSuccess,
  dialogProps,
  onOpen,
}) {
  const { transfer: transferList = [] } = transferListDocument;
  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>State</TableCell>
            <TableCell>Priority</TableCell>
            <TableCell>Transferred</TableCell>
            <TableCell>File Id</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {transferList.map((transferDocument) => (
            <TransferRow
              key={transferDocument.name}
              transferDocument={transferDocument}
              onOpen={onOpen(TRANSFER_PRIORITY_DIALOG)}
            />
          ))}
        </TableBody>
      </Table>
      <TransferPriority
        {...dialogProps}
        dialogName={TRANSFER_PRIORITY_DIALOG}
        onSuccess={onSuccess}
      />
    </>
  );
}

export default withDialogProps(TransferTable);
