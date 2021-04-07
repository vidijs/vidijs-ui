import React from 'react';

import Table from '../ui/Table';
import TableBody from '../ui/TableBody';
import TableCell from '../ui/TableCell';
import TableHead from '../ui/TableHead';
import TableRow from '../ui/TableRow';
import VxaRow from './VxaRow';

export default function VxaListTable({
  vxaListDocument = [],
}) {
  const { vxa: vxaList = [] } = vxaListDocument;
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>UUID</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {vxaList.map((vxaDocument) => (
          <VxaRow
            key={vxaDocument.uuid}
            vxaDocument={vxaDocument}
          />
        ))}
      </TableBody>
    </Table>
  );
}
