import React from 'react';
import { compose } from 'redux';
import { selftest as api } from '@vidijs/vidijs-api';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import { withModalNoRouter } from '../hoc/withModal';
import { withSnackbarNoRouter } from '../hoc/withSnackbar';
import SelfTestStatus from '../components/selftest/SelfTestStatus';
import LoginCard from '../components/login/Login';
import InitDialog from '../components/login/InitDialog';
import GitHubIcon from '../components/ui/GitHubIcon';

const INIT_DIALOG = 'INIT_DIALOG';

class Login extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.onRefreshError = this.onRefreshError.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.onTestUrl = this.onTestUrl.bind(this);
    const { REACT_APP_VIDISPINE_URL, REACT_APP_USE_CORS } = process.env;
    const { VIDISPINE_SERVER_URL, location } = window;
    this.baseUrl = REACT_APP_USE_CORS ? localStorage.getItem('vsBaseUrl') : location.origin;
    this.displayUrl = VIDISPINE_SERVER_URL === '$VIDISPINE_URL' ? REACT_APP_VIDISPINE_URL : VIDISPINE_SERVER_URL;
    this.state = {
      selfTestDocument: undefined,
      loading: false,
      loadingInit: false,
    };
  }

  componentDidMount() {
    document.title = 'vidi.js';
    if (this.baseUrl) {
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
                  return messageList.find(message => message.includes('did APIInit run?'));
                });
              }
              return false;
            });
          }
          if (initTest) {
            onOpen({ modalName: INIT_DIALOG });
          }
        })
        .catch(error => this.onRefreshError(error));
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
    const { onSetBaseUrl } = this.props;
    onSetBaseUrl({ baseUrl });
    this.onRefresh();
  }

  render() {
    const { selfTestDocument, loading, loadingInit } = this.state;
    const { userName } = this.props;
    const initialValues = {
      headers: { username: userName },
      queryParams: { autoRefresh: true, seconds: 604800 },
      baseUrl: this.displayUrl || this.baseUrl,
    };
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
                    canEditUrl={(process.env.REACT_APP_USE_CORS)}
                  />
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid
            item
            sm={8}
            style={{ background: 'linear-gradient(to bottom right, #C33764, #1D2671)' }}
            container
            direction="column"
            alignItems="center"
            justify="center"
          >
            <Grid item>
              <Typography variant="h2">vidi.js</Typography>
            </Grid>
            <Grid item>
              <IconButton onClick={() => window.open('https://github.com/vidijs')}>
                <GitHubIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
        <InitDialog
          dialogName={INIT_DIALOG}
          onSuccess={this.onRefresh}
          loadingInit={loadingInit}
          setLoadingInit={newState => this.setState({ loadingInit: newState })}
        />
      </>
    );
  }
}


export default compose(withModalNoRouter, withSnackbarNoRouter)(Login);
