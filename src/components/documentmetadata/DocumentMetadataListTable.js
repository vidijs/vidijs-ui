import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';

import TableActions from '../ui/TableActions';
import DocumentMetadataListRow from './DocumentMetadataListRow';

export default function DocumentMetadataListTable({
  documentListDocument = {},
  page = 0,
  rowsPerPage = 10,
  onChangePage,
  onChangeRowsPerPage,
}) {
  const { document: documentList = [], hits: count = 0 } = documentListDocument;
  const rowsPerPageOptions = [10, 100, 250];
  if (!rowsPerPageOptions.includes(rowsPerPage)) { rowsPerPageOptions.push(rowsPerPage); }
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell />
        </TableRow>
      </TableHead>
      <TableBody>
        {documentList.map((documentMetadata) => (
          <DocumentMetadataListRow
            key={documentMetadata.name}
            documentMetadata={documentMetadata}
          />
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TablePagination
            count={count}
            page={page}
            rowsPerPage={rowsPerPage}
            colSpan={10}
            onChangePage={onChangePage}
            onChangeRowsPerPage={onChangeRowsPerPage}
            ActionsComponent={TableActions}
            rowsPerPageOptions={[100, 500, 1000]}
          />
        </TableRow>
      </TableFooter>
    </Table>
  );
}
