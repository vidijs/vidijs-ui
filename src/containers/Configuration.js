import React from 'react';

import { configuration as api } from '@vidispine/vdt-api';
import TitleHeader from '../components/ui/TitleHeader';
import UriListCard from '../components/ui/UriListCard';

import withUI from '../hoc/withUI';

class Configuration extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.state = {
      uriListDocument: undefined,
    };
  }

  componentDidMount() {
    document.title = 'xray | Configuration';
    this.onRefresh();
  }

  onRefresh() {
    try {
      api.getConfiguration()
        .then((response) => this.setState({ uriListDocument: response.data }))
        .catch((error) => this.onRefreshError(error));
    } catch (error) {
      this.onRefreshError(error);
    }
  }

  onRefreshError() {
    const { openSnackBar } = this.props;
    const messageContent = 'Error Loading Job Pools';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  }

  render() {
    const { uriListDocument } = this.state;
    return (
      <>
        <TitleHeader
          title="Configuration"
          helpTo="/ref/property.html"
          onRefresh={this.onRefresh}
          code={uriListDocument}
          codeModal="URIListDocument"
        />
        { uriListDocument
        && (
        <UriListCard
          uriListDocument={uriListDocument}
          linkTo={(uri) => `/configuration/${uri}/`}
          titleCase
        />
        )}
      </>
    );
  }
}

export default withUI(Configuration);
