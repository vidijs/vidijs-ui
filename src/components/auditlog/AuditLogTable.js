import React from 'react';
import TableSortLabel from '@material-ui/core/TableSortLabel';

import Table from '../ui/Table';
import TableBody from '../ui/TableBody';
import TableFooter from '../ui/TableFooter';
import TableCell from '../ui/TableCell';
import TableHead from '../ui/TableHead';
import TableRow from '../ui/TableRow';
import AuditLogRow from './AuditLogRow';
import TableActions from '../ui/TableActions';
import TablePagination from '../ui/TablePagination';

export default function FileListTable({
  auditLogDocument,
  count = 0,
  page = 0,
  rowsPerPage = 100,
  onChangePage,
  onChangeRowsPerPage,
  onChangeOrder,
  orderDirection,
}) {
  const { entry: entryList = [] } = auditLogDocument;
  const rowsPerPageOptions = [100, 250, 500];
  if (!rowsPerPageOptions.includes(rowsPerPage)) { rowsPerPageOptions.push(rowsPerPage); }
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>
            <TableSortLabel
              active={orderDirection !== undefined}
              direction={orderDirection}
              onClick={onChangeOrder}
            >
              Timestamp
            </TableSortLabel>
          </TableCell>
          <TableCell>username</TableCell>
          <TableCell>Method</TableCell>
          <TableCell>Path</TableCell>
          <TableCell>Query Parameters</TableCell>
          <TableCell>Matrix Parameters</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {entryList.map((entry, index) => (
          <AuditLogRow
            key={index} // eslint-disable-line react/no-array-index-key
            entry={entry}
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
