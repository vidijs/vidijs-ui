import React from 'react';
import { compose } from 'redux';
import { selftest as api } from '@vidijs/vidijs-api';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import { browserLogin } from '../utils/browserLogin';
import withModal from '../hoc/withModal';
import withSnackbar from '../hoc/withSnackbar';
import SelfTestStatus from '../components/selftest/SelfTestStatus';
import LoginCard from '../components/login/Login';
import InitDialog from '../components/login/InitDialog';
import GitHubIcon from '../components/ui/GitHubIcon';

const styles = {
  main: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'flex-start',
    background: 'linear-gradient(to bottom right, #C33764, #1D2671)',
  },
  headline: {
    marginTop: '1em',
  },
  card: {
    minWidth: 300,
    marginTop: '5em',
  },
};

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
      browserLogin({ baseUrl: this.baseUrl });
      this.onRefresh();
    }
  }

  async onRefresh() {
    const { onOpen } = this.props;
    const { selfTestDocument } = this.state;
    if (selfTestDocument) { this.setState({ selfTestDocument: undefined }); }
    await this.setState({ loading: true });
    try {
      api.listSelfTest({ noAuth: true })
        .then(({ data: selfTestDocument }) => {
          this.setState({ selfTestDocument, loading: false });
          const { status, test: testList = [] } = selfTestDocument;
          let initTest;
          if ( status === 'warning') {
            initTest = testList.find(thisTest => {
              const { name, test: subTestList = [] } = thisTest;
              if (name === 'database') {
                return subTestList.find(thisSubTest => {
                  const { message: messageList = [] } = thisSubTest;
                  return messageList.find(message => message.includes('did APIInit run?'))
                })
              }
              return false;
            })
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

  onSuccess(response) {
    const { history, location } = this.props;
    const { data: token, userName } = response;
    const urlParams = new URLSearchParams(location.search);
    const onLogin = urlParams.get('onLogin') || '/job/';
    browserLogin({ token, userName, baseUrl: this.baseUrl });
    history.push(onLogin);
  }

  onTestUrl(baseUrl) {
    browserLogin({ baseUrl });
    this.onRefresh();
  }

  render() {
    const { selfTestDocument, loading, loadingInit } = this.state;
    const { classes } = this.props;
    const initialValues = {
      headers: { username: 'admin' },
      queryParams: { autoRefresh: true, seconds: 604800 },
      baseUrl: this.displayUrl || this.baseUrl,
    };
    return (
      <div className={classes.main}>
        <Typography variant="display3" className={classes.headline}>vidi.js</Typography>
        <IconButton onClick={() => window.open('https://github.com/vidijs')}>
          <GitHubIcon />
        </IconButton>
        <Card elevation={0} square className={classes.card}>
          <CardHeader
            title={(
              <Grid container alignItems="center" justify="center" direction="row" style={{ height: 35 }}>
                {selfTestDocument && (
                  <SelfTestStatus
                    selfTestDocument={selfTestDocument}
                    clickable
                    onClick={this.onRefresh}
                    loading={loading}
                  />
                )}
              </Grid>
            )}
            disableTypography
          />
          <LoginCard
            initialValues={initialValues}
            onSuccess={this.onSuccess}
            onTestUrl={this.onTestUrl}
            canEditUrl={(process.env.REACT_APP_USE_CORS)}
          />
        </Card>
        <InitDialog
          dialogName={INIT_DIALOG}
          onSuccess={this.onRefresh}
          loadingInit={loadingInit}
          setLoadingInit={newState => this.setState({ loadingInit: newState })}
        />
      </div>
    );
  }
}


export default compose(withModal, withSnackbar, withStyles(styles))(Login);
