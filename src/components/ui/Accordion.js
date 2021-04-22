import React from 'react';
import MUIAccordion from '@material-ui/core/Accordion';

function Accordion(props) {
  const { style = {} } = props;
  const marginTop = '5px';
  const marginBottom = '5px';
  const defaultStyle = { marginTop, marginBottom, ...style };
  return (
    <MUIAccordion elevation={0} square {...props} style={defaultStyle} />
  );
}

export default Accordion;
