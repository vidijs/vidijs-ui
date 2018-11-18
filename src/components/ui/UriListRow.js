import React from 'react';
import startCase from 'lodash.startcase';
import TableCell from '@material-ui/core/TableCell';

import TableRowLink from './TableRowLink';
import UnstyledLink from './UnstyledLink';

export default function UriListRow({
  uri,
  linkTo,
  textTo,
  titleCase = false,
}) {
  const linkProps = {};
  let uriText = uri;
  if (textTo) { uriText = textTo(uri); }
  if (linkTo) { linkProps.to = linkTo(uri); }
  const cellText = titleCase ? startCase(uriText) : uriText;
  return (
    <TableRowLink hover {...linkProps}>
      <TableCell>
        {linkTo ? (
          <UnstyledLink {...linkProps}>
            {cellText}
          </UnstyledLink>
        ) : (
          cellText
        )}
      </TableCell>
      <TableCell />
    </TableRowLink>
  );
}
