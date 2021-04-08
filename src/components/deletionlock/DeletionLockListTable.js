import React from 'react';

import Table from '../ui/Table';
import TableBody from '../ui/TableBody';
import TableFooter from '../ui/TableFooter';
import TableCell from '../ui/TableCell';
import TableHead from '../ui/TableHead';
import TableRow from '../ui/TableRow';
import DeletionLockRow from './DeletionLockRow';
import TableActions from '../ui/TableActions';
import TablePagination from '../ui/TablePagination';

export default function DeletionLockListTable({
  deletionLockListDocument,
  count = 0,
  page = 0,
  rowsPerPage = 100,
  onChangePage,
  onChangeRowsPerPage,
}) {
  const { lock: lockList = [] } = deletionLockListDocument;
  const rowsPerPageOptions = [100, 250, 500];
  if (!rowsPerPageOptions.includes(rowsPerPage)) { rowsPerPageOptions.push(rowsPerPage); }
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Lock ID</TableCell>
          <TableCell>Username</TableCell>
          <TableCell>Expiry Time</TableCell>
          <TableCell>Modified</TableCell>
          <TableCell>Entity Type</TableCell>
          <TableCell>Entity ID</TableCell>
          <TableCell>Effective</TableCell>
          <TableCell>Inherited</TableCell>
          <TableCell>Expired</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {lockList.map((deletionLockType) => (
          <DeletionLockRow
            key={deletionLockType.id}
            deletionLockType={deletionLockType}
          />
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TablePagination
            count={count}
            page={page}
            rowsPerPage={rowsPerPage}
            onChangePage={onChangePage}
            onChangeRowsPerPage={onChangeRowsPerPage}
            ActionsComponent={TableActions}
            rowsPerPageOptions={rowsPerPageOptions}
          />
        </TableRow>
      </TableFooter>
    </Table>
  );
}
