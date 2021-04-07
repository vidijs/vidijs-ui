import React from 'react';

import Table from '../ui/Table';
import TableBody from '../ui/TableBody';
import TableCell from '../ui/TableCell';
import TableHead from '../ui/TableHead';
import TableRow from '../ui/TableRow';
import ExportLocationRow from './ExportLocationRow';

export default function ExportLocationListTable({
  exportLocationListDocument = [],
}) {
  const { exportLocation: exportLocationList = [] } = exportLocationListDocument;
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {exportLocationList.map((exportLocationDocument) => (
          <ExportLocationRow
            key={exportLocationDocument.name}
            exportLocationDocument={exportLocationDocument}
          />
        ))}
      </TableBody>
    </Table>
  );
}
