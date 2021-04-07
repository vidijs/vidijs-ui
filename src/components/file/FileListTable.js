import React from 'react';
import TableSortLabel from '@material-ui/core/TableSortLabel';

import Table from '../ui/Table';
import TableBody from '../ui/TableBody';
import TableFooter from '../ui/TableFooter';
import TableCell from '../ui/TableCell';
import TableHead from '../ui/TableHead';
import TableRow from '../ui/TableRow';
import FileRow from './FileRow';
import TableActions from '../ui/TableActions';
import TablePagination from '../ui/TablePagination';

export default function FileListTable({
  fileListDocument,
  count = 0,
  page = 0,
  rowsPerPage = 10,
  onChangePage,
  onChangeRowsPerPage,
  onChangeOrder,
  orderBy,
  orderDirection,
}) {
  const { file: fileList = [] } = fileListDocument;
  const rowsPerPageOptions = [10, 100, 250];
  if (!rowsPerPageOptions.includes(rowsPerPage)) { rowsPerPageOptions.push(rowsPerPage); }
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>
            <TableSortLabel
              active={orderBy === 'filename'}
              direction={orderDirection}
              onClick={onChangeOrder('filename')}
            >
              Path
            </TableSortLabel>
          </TableCell>
          <TableCell>
            <TableSortLabel
              active={orderBy === 'fileId'}
              direction={orderDirection}
              onClick={onChangeOrder('fileId')}
            >
              ID
            </TableSortLabel>
          </TableCell>
          <TableCell>
            <TableSortLabel
              active={orderBy === 'state'}
              direction={orderDirection}
              onClick={onChangeOrder('state')}
            >
              State
            </TableSortLabel>
          </TableCell>
          <TableCell>Storage</TableCell>
          <TableCell>
            <TableSortLabel
              active={orderBy === 'size'}
              direction={orderDirection}
              onClick={onChangeOrder('size')}
            >
              Size
            </TableSortLabel>
          </TableCell>
          <TableCell>
            <TableSortLabel
              active={orderBy === 'timestamp'}
              direction={orderDirection}
              onClick={onChangeOrder('timestamp')}
            >
              Timestamp
            </TableSortLabel>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {fileList.map((fileDocument) => (
          <FileRow
            key={fileDocument.id}
            fileDocument={fileDocument}
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
