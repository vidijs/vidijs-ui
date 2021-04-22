import React from 'react';
import { useHistory } from 'react-router-dom';
import MUITableRow from '@material-ui/core/TableRow';

export default function TableRow({ to, ...props }) {
  const history = useHistory();
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
