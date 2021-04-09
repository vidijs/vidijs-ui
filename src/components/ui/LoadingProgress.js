import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';

import { withStyles } from '@material-ui/core/styles';
import { utils as api } from '@vidispine/vdt-api';

const styles = ({ palette }) => ({
  barColorPrimary: {
    backgroundColor: { light: 'rgb(3, 102, 214)', dark: 'rgb(88, 166, 255)' }[palette.type],
  },
  colorPrimary: {
    backgroundColor: '#005d9f',
  },
});

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
      isLoading: false,
    };
  }

  componentWillUnmount() {
    api.defaultClient.interceptors.request.eject(this.requestInterceptor);
    api.defaultClient.interceptors.response.eject(this.responseInterceptor);
    this.onClear();
  }

  onShow() {
    this.onClear();
    this.setState({ isLoading: true });
  }

  onHide() {
    this.setState({ isLoading: false });
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
    const { isLoading } = this.state;
    const { classes } = this.props;
    return (
      <div>
        <LinearProgress
          variant={isLoading ? 'indeterminate' : 'determinate'}
          color="primary"
          classes={{
            colorPrimary: classes.colorPrimary,
            barColorPrimary: classes.barColorPrimary,
          }}
          value={100}
        />
      </div>
    );
  }
}

export default withStyles(styles)(LoadingProgress);
