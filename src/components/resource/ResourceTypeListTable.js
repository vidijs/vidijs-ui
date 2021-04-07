import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import ResourceTypeListRow from './ResourceTypeListRow';

export default function ResourceTypeListTable({
  resourceTypeListDocument = {},
}) {
  const { resourcetype: resourceTypeList = [] } = resourceTypeListDocument;
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Resource Type</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {resourceTypeList.map((resourceType) => (
          <ResourceTypeListRow
            key={resourceType.type}
            resourceType={resourceType.type}
          />
        ))}
      </TableBody>
    </Table>
  );
}
