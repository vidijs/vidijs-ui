import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRowLink from '../ui/TableRowLink';
import UnstyledLink from '../ui/UnstyledLink';

export default function DocumentMetadataListRow({
  documentMetadata,
}) {
  return (
    <TableRowLink hover to={`/document/${documentMetadata.name}/`}>
      <TableCell>
        <UnstyledLink to={`/document/${documentMetadata.name}/`}>
          {documentMetadata.name}
        </UnstyledLink>
      </TableCell>
      <TableCell />
    </TableRowLink>
  );
}
