import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import AutoImportRuleRow from './AutoImportRuleRow';

export default function AutoImportRuleListTable({
  autoImportRuleListDocument = {},
}) {
  const { rule: autoImportRuleList = [] } = autoImportRuleListDocument;
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Storage ID</TableCell>
          <TableCell />
        </TableRow>
      </TableHead>
      <TableBody>
        {autoImportRuleList.map((autoImportRule) => (
          <AutoImportRuleRow
            key={autoImportRule.storage}
            autoImportRule={autoImportRule}
          />
        ))}
      </TableBody>
    </Table>
  );
}
