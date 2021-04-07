import React from 'react';

import Table from '../ui/Table';
import TableBody from '../ui/TableBody';
import TableCell from '../ui/TableCell';
import TableHead from '../ui/TableHead';
import TableRow from '../ui/TableRow';

export default function FilePrefixTable({
  filePrefixType,
  onChangePrefix,
}) {
  if (!filePrefixType) return null;
  const { prefix: prefixList = [] } = filePrefixType;
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>
            Prefix
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {prefixList.map((prefix) => (
          <TableRow hover onClick={() => onChangePrefix(prefix)}>
            <TableCell>
              {prefix}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
