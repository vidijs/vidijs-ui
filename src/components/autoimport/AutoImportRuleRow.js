import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRowLink from '../ui/TableRowLink';
import UnstyledLink from '../ui/UnstyledLink';

export default function AutoImportRuleRow({
  autoImportRule,
}) {
  const { storage: storageId } = autoImportRule;
  return (
    <TableRowLink hover to={`/auto-import/${storageId}/`}>
      <TableCell>
        <UnstyledLink to={`/auto-import/${storageId}/`}>
          {storageId}
        </UnstyledLink>
      </TableCell>
      <TableCell />
    </TableRowLink>
  );
}
