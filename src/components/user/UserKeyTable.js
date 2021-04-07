import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import UserKeyRow from './UserKeyRow';
import UserKeyRemove from './UserKeyRemove';
import withDialogProps from '../../hoc/withDialogProps';

const REMOVE_USERKEY_DIALOG = 'REMOVE_USERKEY_DIALOG';

function UserKeyTable({
  accessKeyListDocument,
  onRemoveSuccess,
  userName,
  dialogProps,
  onOpen,
}) {
  if (!accessKeyListDocument) { return null; }
  const { key: accessKeyList = [] } = accessKeyListDocument;
  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Created</TableCell>
            <TableCell>Status</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {accessKeyList.map((accessKeyDocument) => (
            <UserKeyRow
              key={accessKeyDocument.id}
              accessKeyDocument={accessKeyDocument}
              onOpenRemove={onOpen(REMOVE_USERKEY_DIALOG)}
            />
          ))}
        </TableBody>
      </Table>
      <UserKeyRemove
        {...dialogProps}
        dialogName={REMOVE_USERKEY_DIALOG}
        userName={userName}
        onSuccess={onRemoveSuccess}
      />
    </>
  );
}

export default withDialogProps(UserKeyTable);
