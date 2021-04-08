import React from 'react';
import { withRouter } from 'react-router-dom';
import MUITableRow from '@material-ui/core/TableRow';
import withDivComponent from '../../hoc/withDivComponent';

function TableRow({
  history,
  to,
  staticContext,
  match,
  location,
  ...props
}) {
  const { onClick: defaultOnClick } = props;
  const onClick = to ? () => history.push(to) : defaultOnClick;
  return (
    <MUITableRow
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'auto' }}
      {...props}
    />
  );
}

export default withDivComponent(withRouter(TableRow));
