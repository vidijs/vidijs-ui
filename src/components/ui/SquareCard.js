import React from 'react';
import Paper from '@material-ui/core/Paper';

function SquareCard(props) {
  const { style = {} } = props;
  const marginTop = '5px';
  const marginBottom = '5px';
  const defaultStyle = { marginTop, marginBottom, ...style };
  return (
    <Paper elevation={0} square {...props} style={defaultStyle} />
  );
}

export default SquareCard;
