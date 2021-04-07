import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';

import TableActions from './TableActions';
import UriListRow from './UriListRow';

export default function UriListTable({
  uriListDocument = {},
  page,
  rowsPerPage,
  onChangePage,
  onChangeRowsPerPage,
  ...props
}) {
  const { uri: uriList = [], hits: count = 0 } = uriListDocument;
  const rowsPerPageOptions = [10, 100, 250];
  if (!rowsPerPageOptions.includes(rowsPerPage)) { rowsPerPageOptions.push(rowsPerPage); }
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell />
        </TableRow>
      </TableHead>
      <TableBody>
        {uriList.map((uri) => (
          <UriListRow
            key={uri}
            uri={uri}
            {...props}
          />
        ))}
      </TableBody>
      {onChangePage && onChangeRowsPerPage && (
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
      )}
    </Table>
  );
}
