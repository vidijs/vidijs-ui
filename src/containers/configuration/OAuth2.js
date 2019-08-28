import React from 'react';
import { configuration as api } from '@vidijs/vidijs-api';

import AuthCard from '../../components/configuration/auth/AuthCard';
import AuthRemove from '../../components/configuration/auth/AuthRemove';

import TitleHeader from '../../components/ui/TitleHeader';
import withSnackbar from '../../hoc/withSnackbar';

const AUTH_REMOVE_DIALOG = 'AUTH_REMOVE_DIALOG';

class OAuth2 extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.onRefreshError = this.onRefreshError.bind(this);
    this.state = {
      oAuth2ConfigurationDocument: undefined,
    };
  }

  componentDidMount() {
    this.onRefresh();
    document.title = 'vidi.js | Configuration | OAuth2';
  }

  onRefresh() {
    try {
      api.getAuthConfiguration()
        .then(response => this.setState({ oAuth2ConfigurationDocument: response.data }))
        .catch(error => this.onRefreshError(error));
    } catch (error) {
      this.onRefreshError(error);
    }
  }

  onRefreshError() {
    const { openSnackBar } = this.props;
    const messageContent = 'Error Loading OAuth2 Configuration';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  }

  render() {
    const { oAuth2ConfigurationDocument } = this.state;
    return (
      <React.Fragment>
        <TitleHeader
          parentTitle="Configuration"
          parentTo="/configuration/"
          title="OAuth2"
          helpTo="/ref/property.html#oauth2-configuration"
          onRefresh={this.onRefresh}
          code={oAuth2ConfigurationDocument}
          codeModal="OAuth2ConfigurationDocument"
          removeModal={AUTH_REMOVE_DIALOG}
        />
        { oAuth2ConfigurationDocument && (
          <AuthCard
            oAuth2ConfigurationDocument={oAuth2ConfigurationDocument}
            onSuccess={this.onRefresh}
          />
        )}
        <AuthRemove
          dialogName={AUTH_REMOVE_DIALOG}
          onSuccess={this.onRefresh}
        />
      </React.Fragment>
    );
  }
}

export default withSnackbar(OAuth2);
