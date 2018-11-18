import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import startCase from 'lodash.startcase';

import TableRowLink from '../ui/TableRowLink';
import UnstyledLink from '../ui/UnstyledLink';

export default function ResourceTypeListRow({
  resourceType,
}) {
  return (
    <TableRowLink hover to={`/resource/${resourceType}/`}>
      <TableCell>
        <UnstyledLink to={`/resource/${resourceType}/`}>
          {startCase(resourceType)}
        </UnstyledLink>
      </TableCell>
    </TableRowLink>
  );
}
