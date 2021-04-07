import React from 'react';

import { storagerule as api } from '@vidispine/vdt-api';
import StorageRuleTagCard from '../components/storagerule/StorageRuleTagCard';

import withSnackbar from '../hoc/withSnackbar';

const STORAGERULE_DIALOG = 'STORAGERULE_DIALOG';

class StorageRuleTag extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.onRefreshError = this.onRefreshError.bind(this);
    this.state = {
      storageRuleDocument: undefined,
    };
  }

  componentDidMount() {
    this.onRefresh();
  }

  onRefresh() {
    const { tagName } = this.props;
    try {
      api.getStorageRuleShapeTag({ tagName })
        .then((response) => this.setState({ storageRuleDocument: response.data }))
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            this.setState({ storageRuleDocument: undefined });
          } else {
            this.onRefreshError(error);
          }
        });
    } catch (error) {
      this.onRefreshError(error);
    }
  }

  onRefreshError() {
    const { openSnackBar } = this.props;
    const messageContent = 'Error Getting Storage Rule List';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  }

  render() {
    const { tagName } = this.props;
    const { storageRuleDocument } = this.state;
    return (
      <>
        <StorageRuleTagCard
          onRefresh={this.onRefresh}
          storageRuleDocument={storageRuleDocument}
          createModal={STORAGERULE_DIALOG}
          tagName={tagName}
        />
      </>
    );
  }
}

export default withSnackbar(StorageRuleTag);
