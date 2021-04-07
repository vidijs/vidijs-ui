import React from 'react';

import { configuration as api } from '@vidispine/vdt-api';
import CorsCard from '../../components/configuration/cors/CorsCard';

import TitleHeader from '../../components/ui/TitleHeader';
import withSnackbar from '../../hoc/withSnackbar';

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
        .then((response) => this.setState({ corsConfigurationDocument: response.data }))
        .catch((error) => this.onRefreshError(error));
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
      <>
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
      </>
    );
  }
}

export default withSnackbar(Cors);
