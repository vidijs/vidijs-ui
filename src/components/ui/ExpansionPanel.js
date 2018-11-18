import React from 'react';
import MUIExpansionPanel from '@material-ui/core/ExpansionPanel';

function ExpansionPanel(props) {
  const { style = {} } = props;
  const marginTop = '5px';
  const marginBottom = '5px';
  const defaultStyle = { marginTop, marginBottom, ...style };
  return (
    <MUIExpansionPanel elevation={0} square {...props} style={defaultStyle} />
  );
}

export default ExpansionPanel;
