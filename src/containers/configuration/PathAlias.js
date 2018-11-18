import React from 'react';

import withSnackbar from '../../hoc/withSnackbar';
import { configuration as api } from '@vidijs/vidijs-api';
import TitleHeader from '../../components/ui/TitleHeader';
import PathAliasCard from '../../components/configuration/pathalias/PathAliasCard';

class PathAlias extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.state = {
      pathAliasConfigurationDocument: undefined,
    };
  }

  componentDidMount() {
    document.title = 'vidi.js | Path Alias';
    this.onRefresh();
  }

  onRefresh() {
    try {
      api.getPathAliasConfiguration()
        .then(response => this.setState({ pathAliasConfigurationDocument: response.data }))
        .catch(error => this.onRefreshError(error));
    } catch (error) {
      this.onRefreshError(error);
    }
  }

  onRefreshError() {
    const { openSnackBar } = this.props;
    const messageContent = 'Error Loading Path Alias Configuration';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  }

  render() {
    const { pathAliasConfigurationDocument } = this.state;
    return (
      <React.Fragment>
        <TitleHeader
          title="Path Alias"
          parentTitle="Configuration"
          parentTo="/configuration/"
          helpTo="/ref/property.html#path-alias-configuration"
          onRefresh={this.onRefresh}
          code={pathAliasConfigurationDocument}
          codeModal="PathAliasConfigurationDocument"
        />
        {pathAliasConfigurationDocument &&
        <PathAliasCard
          pathAliasConfigurationDocument={pathAliasConfigurationDocument}
          onSuccess={this.onRefresh}
        />
        }
      </React.Fragment>
    );
  }
}

export default withSnackbar(PathAlias);
