import React from 'react';

import TitleHeader from '../components/ui/TitleHeader';
import UriListCard from '../components/ui/UriListCard';

import withUI from '../hoc/withUI';
import { configuration as api } from '@vidijs/vidijs-api';

class Configuration extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.state = {
      uriListDocument: undefined,
    };
  }

  componentDidMount() {
    document.title = 'vidi.js | Configuration';
    this.onRefresh();
  }

  onRefresh() {
    try {
      api.getConfiguration()
        .then(response => this.setState({ uriListDocument: response.data }))
        .catch(error => this.onRefreshError(error));
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
      <React.Fragment>
        <TitleHeader
          title="Configuration"
          helpTo="/ref/property.html"
          onRefresh={this.onRefresh}
          code={uriListDocument}
          codeModal="URIListDocument"
        />
        { uriListDocument &&
        <UriListCard
          uriListDocument={uriListDocument}
          linkTo={uri => `/configuration/${uri}/`}
          titleCase
        />
        }
      </React.Fragment>
    );
  }
}


export default withUI(Configuration);
