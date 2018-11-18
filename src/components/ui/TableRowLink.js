import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import { withRouter } from 'react-router-dom';

function TableRowLink({
  history,
  to,
  staticContext,
  match,
  location,
  ...props
}) {
  const onClick = to ? () => history.push(to) : props.onClick;
  return (
    <TableRow
      onClick={onClick}
      {...props}
    />
  );
}

export default withRouter(TableRowLink);
