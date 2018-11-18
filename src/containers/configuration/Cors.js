import React from 'react';

import CorsCard from '../../components/configuration/cors/CorsCard';

import TitleHeader from '../../components/ui/TitleHeader';
import withSnackbar from '../../hoc/withSnackbar';
import { configuration as api } from '@vidijs/vidijs-api';


class Cors extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.onRefreshError = this.onRefreshError.bind(this);
    this.state = {
      corsConfigurationDocument: undefined,
    };
  }

  componentDidMount() {
    this.onRefresh();
    document.title = 'vidi.js | Configuration | CORS';
  }

  onRefresh() {
    try {
      api.getCorsConfiguration()
        .then(response => this.setState({ corsConfigurationDocument: response.data }))
        .catch(error => this.onRefreshError(error));
    } catch (error) {
      this.onRefreshError(error);
    }
  }

  onRefreshError() {
    const { openSnackBar } = this.props;
    const messageContent = 'Error Loading Cors Configuration';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  }

  render() {
    const { corsConfigurationDocument } = this.state;
    return (
      <React.Fragment>
        <TitleHeader
          parentTitle="Configuration"
          parentTo="/configuration/"
          title="CORS"
          helpTo="/ref/property.html#cors-configuration"
          onRefresh={this.onRefresh}
          code={corsConfigurationDocument}
          codeModal="CORSConfigurationDocument"
        />
        { corsConfigurationDocument && (
          <CorsCard
            corsConfigurationDocument={corsConfigurationDocument}
            onSuccess={this.onRefresh}
          />
        )}
      </React.Fragment>
    );
  }
}

export default withSnackbar(Cors);
