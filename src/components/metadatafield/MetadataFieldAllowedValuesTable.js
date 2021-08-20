import React from 'react';

import Table from '../ui/Table';
import TableBody from '../ui/TableBody';
import TableCell from '../ui/TableCell';
import TableHead from '../ui/TableHead';
import TableRow from '../ui/TableRow';
import withDialogProps from '../../hoc/withDialogProps';

function MetadataFieldAllowedValuesTable({
  constraintValueListDocument = {},
}) {
  const { value: constraintValueList = [] } = constraintValueListDocument;
  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Value</TableCell>
            <TableCell>ID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {constraintValueList.map((constraintValueType) => (
            <TableRow key={constraintValueType.value} hover>
              <TableCell>{constraintValueType.value}</TableCell>
              <TableCell>{constraintValueType.id}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export default withDialogProps(MetadataFieldAllowedValuesTable);
