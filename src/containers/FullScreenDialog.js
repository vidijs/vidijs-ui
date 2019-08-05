import React from 'react';
import { compose } from 'redux';

import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { Link, withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';

import { WrappedSelect } from '../components/ui/Select';
import { withModalNoRouter } from '../hoc/withModal';

const styles = theme => ({
  appBar: {
    position: 'relative',
    backgroundColor: theme.palette.background.default,
  },
  dialogRoot: {
    justifyContent: 'flex-start',
  },
  scrollPaper: {
    width: '85%',
    backgroundColor: theme.palette.background.default,
  },
});

const Transition = React.forwardRef((props, ref) => <Slide direction="down" ref={ref} {...props} />);


function FullScreenDialog({
  classes,
  open,
  onClose,
  history,
}) {
  const baseUrl = localStorage.getItem('vsBaseUrl');
  const itemParams = new URLSearchParams({
    content: 'metadata,thumbnail',
    baseURI: `${baseUrl}/APInoauth/`,
    terse: true,
    'noauth-url': true,
  });
  const linkOptions = [
    { value: '/new-job/', label: 'New Job' },
    { value: '/job', label: 'Job List' },
    { value: '/jobtype/', label: 'Job Types' },
    { value: '/search/', label: 'Search Items & Collections' },
    { value: `/item/?${itemParams.toString()}`, label: 'Search Items' },
    { value: '/collection/', label: 'Search Collections' },
    { value: '/shape/', label: 'Search Shapes' },
    { value: '/search/field-group/', label: 'Search Field Groups' },
    { value: '/library/', label: 'Search Libraries' },
    { value: '/storage/', label: 'Storages' },
    { value: '/file/', label: 'Files' },
    { value: '/storage-rule/', label: 'Storage Rules' },
    { value: '/import/?tab=IMPORTPLACEHOLDER_TAB', label: 'Create Item' },
    { value: '/import/?tab=IMPORTCOLLECTION_TAB', label: 'Create Collection' },
    { value: '/import/?tab=IMPORTSHAPEPLACEHOLDER_TAB', label: 'Create Shape' },
    { value: '/import/?tab=IMPORTFILE_TAB', label: 'Import File' },
    { value: '/import/?tab=IMPORTRAW_TAB', label: 'Upload' },
    { value: '/import/?tab=IMPORTURI_TAB', label: 'Import URIs' },
    { value: '/import/?tab=IMPORTSHAPE_TAB', label: 'Import Shape' },
    { value: '/import/?tab=IMPORTCOMPONENT_TAB', label: 'Import Component' },
    { value: '/import-imp/?tab=IMPORTIMP_URL_TAB', label: 'Import IMP URL' },
    { value: '/import-imp/?tab=IMPORTIMP_PATH_TAB', label: 'Import IMP Path' },
    { value: '/import-imp/?tab=IMPORTIMP_FILE_TAB', label: 'Import IMP File' },
    { value: '/vxa/', label: 'VSA Server Agents' },
    { value: '/resource/transcoder/', label: 'Transcoders' },
    { value: '/resource/thumbnail/', label: 'Thumbnail Paths' },
    { value: '/resource/vidinet/', label: 'Vidinet' },
    { value: '/export-location', label: 'Export Locations' },
    { value: '/user/', label: 'Users' },
    { value: '/group/', label: 'Groups' },
    { value: '/metadata-field/', label: 'Metadata Fields' },
    { value: '/field-group/', label: 'Metadata Field Groups' },
    { value: '/debug/echo/', label: 'XML Echo' },
    { value: '/javascript/test/', label: 'Javascript Test' },
    { value: '/wizard/', label: 'Wizard' },
    { value: '/shape-tag/', label: 'Shape Tags' },
    { value: '/version/', label: 'Version' },
    { value: '/selftest/', label: 'Self Test' },
    { value: '/log', label: 'Audit Log' },
    { value: '/error/', label: 'Error Log' },
    { value: '/reindex/', label: 'Re-Index' },
    { value: '/service/', label: 'Services' },
    { value: '/configuration/properties/', label: 'Configuration Properties' },
    { value: '/configuration/job-pool/', label: 'Job Pools' },
    { value: '/configuration/path-alias/', label: 'Path Alias' },
    { value: '/external-id/', label: 'External Identifiers' },
    { value: '/document/', label: 'Document' },
    { value: '/conform/', label: 'Conform' },
    { value: '/projection/', label: 'Projection' },
    { value: '/notification/', label: 'Notification' },
    { value: '/notification/item/', label: 'Item Notification' },
    { value: '/notification/collection/', label: 'Collection Notification' },
    { value: '/notification/job/', label: 'Job Notification' },
    { value: '/notification/storage/', label: 'Storage Notification' },
    { value: '/notification/file/', label: 'File Notification' },
    { value: '/notification/quota/', label: 'Quota Notification' },
    { value: '/notification/group/', label: 'Group Notification' },
    { value: '/notification/document/', label: 'Document Notification' },
    { value: '/import/settings/', label: 'Import Settings' },
    { value: '/task-group/', label: 'Task Groups' },
    { value: '/quota/', label: 'Quota' },
    { value: '/storage-group/', label: 'Storage Groups' },
    { value: '/auto-import/', label: 'Auto Import Rules' },
    { value: '/service/stacktrace/', label: 'Stack Trace' },
    { value: '/transfer/', label: 'Import Transfers' },
    { value: '/configuration/', label: 'Configuration' },
    { value: '/configuration/ftp-pool/', label: 'FTP Pool' },
  ];
  const ListLink = ({ to, primary }) => (
    <ListItem button to={to} component={Link} onClick={onClose}>
      <ListItemText secondary={primary} />
    </ListItem>
  );
  const ListGroup = ({ subheader, children }) => (
    <List
      component="nav"
      subheader={(
        <ListSubheader disableSticky>
          { subheader }
        </ListSubheader>
      )}
    >
      { children }
    </List>
  );
  const breakPoints = {
    lg: 2,
    md: 3,
    sm: 6,
    xs: 12,
  };
  const goToLink = (e) => {
    onClose();
    history.push(e.value);
  };
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      classes={{ root: classes.dialogRoot, scrollPaper: classes.scrollPaper }}
    >
      <AppBar elevation={0} className={classes.appBar}>
        <Toolbar disableGutters variant="dense">
          <Grid container alignItems="flex-start">
            <Grid item>
              <IconButton onClick={onClose}>
                <CloseIcon />
              </IconButton>
            </Grid>
            <Grid item xs={8}>
              <WrappedSelect options={linkOptions} onChange={goToLink} label="Search..." />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <DialogContent>
        <Grid container alignItems="flex-start">
          <Grid item {...breakPoints}>
            <ListGroup subheader="Workflow">
              <ListLink to="/new-job/" primary="New Job" />
              <ListLink to="/job" primary="Job List" />
              <ListLink to="/jobtype/" primary="Job Types" />
              <ListLink to="/task-group/" primary="Task Groups" />
            </ListGroup>
          </Grid>
          <Grid item {...breakPoints}>
            <ListGroup subheader="Search">
              <ListLink to="/search/" primary="Items & Collections" />
              <ListLink to={`/item/?${itemParams.toString()}`} primary="Items" />
              <ListLink to="/collection/" primary="Collections" />
              <ListLink to="/shape/" primary="Shapes" />
              <ListLink to="/library/" primary="Libraries" />
              <ListLink to="/search/field-group/" primary="Field Groups" />
            </ListGroup>
          </Grid>
          <Grid item {...breakPoints}>
            <ListGroup subheader="Storage">
              <ListLink to="/storage/" primary="Storages" />
              <ListLink to="/file/" primary="Files" />
              <ListLink to="/storage-rule/" primary="Storage Rules" />
              <ListLink to="/quota/" primary="Quota" />
              <ListLink to="/storage-group/" primary="Storage Groups" />
              <ListLink to="/auto-import/" primary="Auto Import Rules" />
            </ListGroup>
          </Grid>
          <Grid item {...breakPoints}>
            <ListGroup subheader="Create">
              <ListLink to="/import/?tab=IMPORTPLACEHOLDER_TAB" primary="Item" />
              <ListLink to="/import/?tab=IMPORTCOLLECTION_TAB" primary="Collection" />
              <ListLink to="/import/?tab=IMPORTSHAPEPLACEHOLDER_TAB" primary="Shape" />
            </ListGroup>
          </Grid>
          <Grid item {...breakPoints}>
            <ListGroup subheader="Import">
              <ListLink to="/import/?tab=IMPORTFILE_TAB" primary="File" />
              <ListLink to="/import/?tab=IMPORTRAW_TAB" primary="Upload" />
              <ListLink to="/import/?tab=IMPORTURI_TAB" primary="URIs" />
              <ListLink to="/import/?tab=IMPORTSHAPE_TAB" primary="Shape" />
              <ListLink to="/import/?tab=IMPORTCOMPONENT_TAB" primary="Component" />
              <ListLink to="/import/settings/" primary="Settings" />
            </ListGroup>
          </Grid>
          <Grid item {...breakPoints}>
            <ListGroup subheader="IMF">
              <ListLink to="/import-imp/?tab=IMPORTIMP_URL_TAB" primary="Import From URL" />
              <ListLink to="/import-imp/?tab=IMPORTIMP_PATH_TAB" primary="Import From Path" />
              <ListLink to="/import-imp/?tab=IMPORTIMP_File_TAB" primary="Import From File" />
            </ListGroup>
          </Grid>
          <Grid item {...breakPoints}>
            <ListGroup subheader="Resources">
              <ListLink to="/vxa/" primary="Server Agents" />
              <ListLink to="/resource/transcoder/" primary="Transcoders" />
              <ListLink to="/resource/thumbnail/" primary="Thumbnail Paths" />
              <ListLink to="/export-location" primary="Export Locations" />
              <ListLink to="/resource/vidinet/" primary="Vidinet" />
              <ListLink to="/resource/" primary="All Resources" />
            </ListGroup>
          </Grid>
          <Grid item {...breakPoints}>
            <ListGroup subheader="Authentication">
              <ListLink to="/user/" primary="Users" />
              <ListLink to="/group/" primary="Groups" />
            </ListGroup>
          </Grid>
          <Grid item {...breakPoints}>
            <ListGroup subheader="Metadata">
              <ListLink to="/metadata-field/" primary="Fields" />
              <ListLink to="/field-group/" primary="Field Groups" />
              <ListLink to="/document/" primary="Document" />
              <ListLink to="/projection/" primary="Projection" />
            </ListGroup>
          </Grid>
          <Grid item {...breakPoints}>
            <ListGroup subheader="Utils">
              <ListLink to="/debug/echo/" primary="XML Echo" />
              <ListLink to="/javascript/test/" primary="Javascript Test" />
              <ListLink to="/wizard/" primary="Wizard" />
            </ListGroup>
          </Grid>
          <Grid item {...breakPoints}>
            <ListGroup subheader="Transcoding">
              <ListLink to="/shape-tag/" primary="Shape Tags" />
              <ListLink to="/conform/" primary="Conform Media" />
            </ListGroup>
          </Grid>
          <Grid item {...breakPoints}>
            <ListGroup subheader="Information">
              <ListLink to="/version/" primary="Version" />
              <ListLink to="/selftest/" primary="Self Test" />
              <ListLink to="/log" primary="Audit Log" />
              <ListLink to="/error/" primary="Error Log" />
              <ListLink to="/transfer/" primary="Import Transfers" />
            </ListGroup>
          </Grid>
          <Grid item {...breakPoints}>
            <ListGroup subheader="System">
              <ListLink to="/reindex/" primary="Re-Index" />
              <ListLink to="/service/" primary="Services" />
              <ListLink to="/service/stacktrace/" primary="Stack Trace" />
            </ListGroup>
          </Grid>
          <Grid item {...breakPoints}>
            <ListGroup subheader="Configuration">
              <ListLink to="/configuration/properties/" primary="Properties" />
              <ListLink to="/configuration/job-pool/" primary="Job Pool" />
              <ListLink to="/configuration/ftp-pool/" primary="FTP Pool" />
              <ListLink to="/configuration/path-alias/" primary="Path Alias" />
              <ListLink to="/external-id/" primary="External Identifiers" />
              <ListLink to="/configuration/" primary="All Configuration" />
            </ListGroup>
          </Grid>
          <Grid item {...breakPoints}>
            <ListGroup subheader="Notification">
              <ListLink to="/notification/item/" primary="Item" />
              <ListLink to="/notification/collection/" primary="Collection" />
              <ListLink to="/notification/job/" primary="Job" />
              <ListLink to="/notification/" primary="All Notification" />
            </ListGroup>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Typography variant="caption">
          {`Last Commit: ${process.env.REACT_APP_GIT_COMMIT}` || 'Last Commit: UNKNOWN'}
        </Typography>
      </DialogActions>
    </Dialog>
  );
}

export default compose(withRouter, withModalNoRouter, withStyles(styles))(FullScreenDialog);
