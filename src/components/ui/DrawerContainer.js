import React from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';

const drawerWidth = 200;

const styles = (theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  paper: {
    marginTop: 54,
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(4),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(6),
    },
  },
});

class DrawerContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
    this.handleDrawerClose = this.handleDrawerClose.bind(this);
    this.state = {
      open: props.defaultOpen || false,
    };
  }

  handleDrawerOpen() {
    this.setState({ open: true });
  }

  handleDrawerClose() {
    this.setState({ open: false });
  }

  render() {
    const {
      classes,
      listComponent: ListComponent,
      mainComponent: MainComponent,
      ...props
    } = this.props;
    const { open } = this.state;
    return (
      <div style={{ display: 'flex' }}>
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx(classes.paper, {
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
          open={open}
        >
          <ListItem
            button
            onClick={open ? this.handleDrawerClose : this.handleDrawerOpen}
            disableRipple
            disableGutters
          >
            <ListItemIcon>{open ? <ChevronLeftIcon /> : <ChevronRightIcon />}</ListItemIcon>
          </ListItem>
          <ListComponent {...props} />
        </Drawer>
        <div
          style={{
            flexGrow: 1,
          }}
        >
          <MainComponent {...props} />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(DrawerContainer);
