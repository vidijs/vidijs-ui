import React from 'react';
import MUITableCell from '@material-ui/core/TableCell';

import withDivComponent from '../../hoc/withDivComponent';

function TableCell({
  disableOnClick,
  onClick,
  ...props
}) {
  const onThisClick = disableOnClick ? (event) => event.stopPropagation() : onClick;
  return (
    <MUITableCell
      onClick={onThisClick}
      {...props}
    />
  );
}

export default withDivComponent(TableCell);
