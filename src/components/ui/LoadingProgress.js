import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';

import { withStyles } from '@material-ui/core/styles';
import { utils as api } from '@vidispine/vdt-api';

const styles = {
  linearColorPrimary: {
    backgroundColor: '#1D2671',
  },
  linearBarColorPrimary: {
    backgroundColor: '#C33764',
  },
};

class LoadingProgress extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onShow = this.onShow.bind(this);
    this.onHide = this.onHide.bind(this);
    this.onDelayHide = this.onDelayHide.bind(this);
    this.onClear = this.onClear.bind(this);
    this.requestInterceptor = api.defaultClient.interceptors.request.use((request) => {
      this.onShow();
      return request;
    });
    this.responseInterceptor = api.defaultClient.interceptors.response.use(
      (response) => {
        this.onDelayHide();
        return response;
      },
      (error) => {
        this.onDelayHide();
        return Promise.reject(error);
      },
    );
    this.state = {
      showLoading: 100,
    };
  }

  componentWillUnmount() {
    api.defaultClient.interceptors.request.eject(this.requestInterceptor);
    api.defaultClient.interceptors.response.eject(this.responseInterceptor);
    this.onClear();
  }

  onShow() {
    this.onClear();
    this.setState({ showLoading: 0 });
  }

  onHide() {
    this.setState({ showLoading: 100 });
    this.onClear();
  }

  onDelayHide() {
    this.timer = setInterval(() => this.onHide(), 1000);
  }

  onClear() {
    clearInterval(this.timer);
    this.timer = undefined;
  }

  render() {
    const { showLoading } = this.state;
    const { variant = 'determinate', classes } = this.props;
    return (
      <div>
        { variant === 'determinate' ? (
          <LinearProgress
            variant="determinate"
            value={showLoading}
            color="primary"
            classes={{
              colorPrimary: classes.linearColorPrimary,
              barColorPrimary: classes.linearBarColorPrimary,
            }}
          />
        ) : showLoading === 100 && (
          <LinearProgress
            variant="query"
            classes={{
              colorPrimary: classes.linearColorPrimary,
              barColorPrimary: classes.linearBarColorPrimary,
            }}
          />
        )}
      </div>
    );
  }
}

export default withStyles(styles)(LoadingProgress);
