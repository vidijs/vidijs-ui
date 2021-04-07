import React from 'react';
import { compose } from 'redux';
import { selftest as api } from '@vidispine/vdt-api';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import HelpIcon from '@material-ui/icons/HelpOutline';

import { withModalNoRouter } from '../hoc/withModal';
import { withSnackbarNoRouter } from '../hoc/withSnackbar';
import SelfTestStatus from '../components/selftest/SelfTestStatus';
import LoginCard from '../components/login/Login';
import InitDialog from '../components/login/InitDialog';
import LoginHelpDialog from '../components/login/LoginHelpDialog';
import GitHubIcon from '../components/ui/GitHubIcon';

const INIT_DIALOG = 'INIT_DIALOG';
const HELP_DIALOG = 'HELP_DIALOG';

const {
  REACT_APP_UNSPLASH_DISABLE,
  REACT_APP_UNSPLASH_URL = 'https://source.unsplash.com/collection/8534454/800x600/daily',
  REACT_APP_VERSION,
} = process.env;

class Login extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.onRefreshError = this.onRefreshError.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.onTestUrl = this.onTestUrl.bind(this);
    this.state = {
      selfTestDocument: undefined,
      loading: false,
      loadingInit: false,
    };
  }

  componentDidMount() {
    document.title = 'vidi.js';
    const { baseUrl } = this.props;
    if (baseUrl) {
      this.onRefresh();
    }
  }

  async onRefresh() {
    const { onOpen } = this.props;
    this.setState({ selfTestDocument: undefined });
    await this.setState({ loading: true });
    try {
      api.listSelfTest({ noAuth: true })
        .then(({ data: selfTestDocument }) => {
          this.setState({ selfTestDocument, loading: false });
          const { status, test: testList = [] } = selfTestDocument;
          let initTest;
          if (status === 'warning') {
            initTest = testList.find((thisTest) => {
              const { name, test: subTestList = [] } = thisTest;
              if (name === 'database') {
                return subTestList.find((thisSubTest) => {
                  const { message: messageList = [] } = thisSubTest;
                  return messageList.find((message) => message.includes('did APIInit run?'));
                });
              }
              return false;
            });
          }
          if (initTest) {
            onOpen({ modalName: INIT_DIALOG });
          }
        })
        .catch((error) => this.onRefreshError(error));
    } catch (error) {
      this.onRefreshError(error);
    }
  }

  onRefreshError() {
    const { openSnackBar } = this.props;
    this.setState({ loading: false, selfTestDocument: { status: 'failed' } });
    const messageContent = 'Error Contacting Server';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  }

  onSuccess({ data: token, userName: newUserName, runAs }) {
    const {
      setUserName,
      setToken,
      setRunAs,
    } = this.props;
    if (runAs) {
      setRunAs(runAs);
    }
    setUserName(newUserName);
    setToken(token);
  }

  onTestUrl(baseUrl) {
    const { setBaseUrl } = this.props;
    setBaseUrl(baseUrl);
    this.onRefresh();
  }

  render() {
    const { selfTestDocument, loading, loadingInit } = this.state;
    const { userName, baseUrl, onOpen } = this.props;
    const initialValues = {
      headers: { username: userName, accept: 'text/plain' },
      queryParams: { autoRefresh: true, seconds: 604800 },
      baseUrl,
    };
    const { status } = selfTestDocument || {};
    return (
      <>
        <Grid container>
          <Grid item sm={4}>
            <Card elevation={0} square style={{ height: '100vh' }}>
              <Grid container direction="column" justify="center" alignItems="center" style={{ height: '100%' }}>
                <Grid item>
                  <Grid container alignItems="center" justify="center" direction="row" style={{ height: 35, marginBottom: 20 }}>
                    {selfTestDocument && (
                      <SelfTestStatus
                        selfTestDocument={selfTestDocument}
                        clickable
                        onClick={this.onRefresh}
                        loading={loading}
                      />
                    )}
                  </Grid>
                  <LoginCard
                    initialValues={initialValues}
                    onSuccess={this.onSuccess}
                    onTestUrl={this.onTestUrl}
                    status={status}
                  />
                </Grid>
              </Grid>
              <AppBar
                color="inherit"
                style={{
                  top: 'auto',
                  bottom: 0,
                  backgroundColor: 'black',
                  color: 'white',
                }}
                square
                elevation={0}
              >
                <Toolbar variant="dense">
                  <Grid container justify="flex-end" alignItems="center">
                    <Link
                      href="https://github.com/vidijs/vidijs-ui"
                      variant="body2"
                      color="inherit"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ marginRight: 5 }}
                    >
                      vidijs-ui
                    </Link>
                    <Typography
                      variant="body2"
                      color="inherit"
                    >
                      {`v${REACT_APP_VERSION}`}
                    </Typography>
                    <IconButton
                      color="inherit"
                      href="https://github.com/vidijs"
                      target="_blank"
                      rel="noopener noreferrer"
                      disableRipple
                    >
                      <GitHubIcon />
                    </IconButton>
                    <IconButton
                      color="inherit"
                      disableRipple
                      onClick={() => onOpen({ modalName: HELP_DIALOG })}
                    >
                      <HelpIcon />
                    </IconButton>
                  </Grid>
                </Toolbar>
              </AppBar>
            </Card>
          </Grid>
          <Grid
            item
            sm={8}
            style={REACT_APP_UNSPLASH_DISABLE ? {
              background: 'linear-gradient(to bottom right, #C33764, #1D2671)',
            } : {
              backgroundImage: `url("${REACT_APP_UNSPLASH_URL}")`,
              backgroundSize: 'cover',
            }}
            container
            direction="column"
            alignItems="center"
            justify="center"
          />
        </Grid>
        <InitDialog
          dialogName={INIT_DIALOG}
          onSuccess={this.onRefresh}
          loadingInit={loadingInit}
          setLoadingInit={(newState) => this.setState({ loadingInit: newState })}
        />
        <LoginHelpDialog
          dialogName={HELP_DIALOG}
        />
      </>
    );
  }
}

export default compose(withModalNoRouter, withSnackbarNoRouter)(Login);
