import React from 'react';
import MUITable from '@material-ui/core/Table';
import { withStyles } from '@material-ui/core/styles';

import withDivComponent from '../../hoc/withDivComponent';

const Table = (props) => <MUITable {...props} className={props.classes.root} />;

export default withStyles({ root: { tableLayout: 'fixed' } })(withDivComponent(Table));
