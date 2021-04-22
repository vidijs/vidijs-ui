import React from 'react';

import { configuration as api } from '@vidispine/vdt-api';
import IndexingCard from '../../components/configuration/indexing/IndexingCard';

import TitleHeader from '../../components/ui/TitleHeader';
import withSnackbar from '../../hoc/withSnackbar';

class Indexing extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.onRefreshError = this.onRefreshError.bind(this);
    this.state = {
      indexingConfigurationDocument: undefined,
    };
  }

  componentDidMount() {
    this.onRefresh();
    document.title = 'xray | Configuration | Indexing';
  }

  onRefresh() {
    try {
      api.getIndexingConfiguration()
        .then((response) => this.setState({ indexingConfigurationDocument: response.data }))
        .catch((error) => this.onRefreshError(error));
    } catch (error) {
      this.onRefreshError(error);
    }
  }

  onRefreshError() {
    const { openSnackBar } = this.props;
    const messageContent = 'Error Loading Indexing Configuration';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  }

  render() {
    const { indexingConfigurationDocument } = this.state;
    return (
      <>
        <TitleHeader
          title="Indexing"
          parentTitle="Configuration"
          parentTo="/configuration/"
          helpTo="/ref/property.html#indexing-settings"
          onRefresh={this.onRefresh}
          code={indexingConfigurationDocument}
          codeModal="IndexingConfigurationDocument"
        />
        { indexingConfigurationDocument
        && (
        <IndexingCard
          indexingConfigurationDocument={indexingConfigurationDocument}
          onSuccess={this.onRefresh}
        />
        )}
      </>
    );
  }
}

export default withSnackbar(Indexing);
