import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import startCase from 'lodash.startcase';

import Menu, { MenuItem } from '../ui/Menu';

function ReindexTable({
  reindexList = [],
  onUpdateReindex,
}) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Index</TableCell>
          <TableCell>Priority</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Started</TableCell>
          <TableCell>Finished</TableCell>
          <TableCell>Completed</TableCell>
          <TableCell>Total</TableCell>
          <TableCell />
        </TableRow>
      </TableHead>
      <TableBody>
        {reindexList.map((reindex) => (
          <TableRow key={reindex.index} hover>
            <TableCell>{startCase(reindex.index)}</TableCell>
            <TableCell>{reindex.priority}</TableCell>
            <TableCell>{reindex.status}</TableCell>
            <TableCell>
              {reindex.start ? moment(reindex.start).fromNow().toString() : ''}
            </TableCell>
            <TableCell>
              {reindex.finish ? moment(reindex.finish).fromNow().toString() : ''}
            </TableCell>
            <TableCell>{reindex.indexesDone}</TableCell>
            <TableCell>{reindex.indexesTotal}</TableCell>
            <TableCell numeric>
              <Menu>
                <MenuItem onClick={() => onUpdateReindex({ indexName: reindex.index, queryParams: { status: 'IN_QUEUE' } })}>
                  <Typography color="inherit">Queue Reindex</Typography>
                </MenuItem>
                <MenuItem onClick={() => onUpdateReindex({ indexName: reindex.index, queryParams: { status: 'PAUSED' } })}>
                  <Typography color="inherit">Pause Reindex</Typography>
                </MenuItem>
                <MenuItem onClick={() => onUpdateReindex({ indexName: reindex.index, queryParams: { status: 'IN_PROGRESS' } })}>
                  <Typography color="inherit">Resume Reindex</Typography>
                </MenuItem>
                <MenuItem onClick={() => onUpdateReindex({ indexName: reindex.index, queryParams: { status: 'ABORTED' } })}>
                  <Typography color="secondary">Cancel Reindex</Typography>
                </MenuItem>
              </Menu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default ReindexTable;
