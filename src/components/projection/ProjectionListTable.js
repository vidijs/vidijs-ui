import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import ProjectionListRow from './ProjectionListRow';

export default function ProjectionListTable({
  projectionList = [],
}) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell />
        </TableRow>
      </TableHead>
      <TableBody>
        {projectionList.map((projection) => (
          <ProjectionListRow
            key={projection}
            projection={projection}
          />
        ))}
      </TableBody>
    </Table>
  );
}
