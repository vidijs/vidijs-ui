import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: (props) => ({
    '& > *': {
      marginBottom: theme.spacing(props.mb),
    },
  }),

}));

export default function CardList({ mb = 2, children }) {
  const classes = useStyles({ mb });
  return (
    <div className={classes.root}>
      {children}
    </div>
  );
}
