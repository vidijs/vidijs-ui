import React from 'react';

import AutoImportRuleTitle from '../components/autoimport/AutoImportRuleTitle';
import AutoImportRuleCard from '../components/autoimport/AutoImportRuleCard';
import AutoImportRuleRemove from '../components/autoimport/AutoImportRuleRemove';
import withSnackbar from '../hoc/withSnackbar';

import { autoimport as api } from '@vidijs/vidijs-api';

const AUTOIMPORTRULE_REMOVE_MODAL = 'AUTOIMPORTRULE_REMOVE_MODAL';

class AutoImportRule extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.state = {
      autoImportRuleDocument: undefined,
    };
  }

  componentDidMount() {
    const { storageId } = this.props;
    document.title = `vidi.js | Auto Import Rule | ${storageId}`;
    this.onRefresh();
  }

  onRefresh() {
    const { openSnackBar, storageId } = this.props;
    try {
      api.getAutoImport({ storageId })
        .then(response => this.setState({ autoImportRuleDocument: response.data }));
    } catch (error) {
      const messageContent = 'Error Loading Auto Import Rule';
      openSnackBar({ messageContent, messageColor: 'secondary' });
    }
  }

  render() {
    const {
      storageId,
    } = this.props;
    const {
      autoImportRuleDocument,
    } = this.state;
    return (
      <React.Fragment>
        <AutoImportRuleTitle
          removeModal={AUTOIMPORTRULE_REMOVE_MODAL}
          onRefresh={this.onRefresh}
          storageId={storageId}
          code={autoImportRuleDocument}
          codeModal="AutoImportRuleDocument"
        />
        {autoImportRuleDocument &&
        <AutoImportRuleCard
          onRefresh={this.onRefresh}
          storageId={storageId}
          autoImportRuleDocument={autoImportRuleDocument}
        />
        }
        <AutoImportRuleRemove
          dialogName={AUTOIMPORTRULE_REMOVE_MODAL}
          storageId={storageId}
        />
      </React.Fragment>
    );
  }
}


export default withSnackbar(AutoImportRule);
