import React from 'react';

import { autoimport as api } from '@vidispine/vdt-api';
import AutoImportRuleTitle from '../components/autoimport/AutoImportRuleTitle';
import AutoImportRuleCard from '../components/autoimport/AutoImportRuleCard';
import AutoImportRuleRemove from '../components/autoimport/AutoImportRuleRemove';
import withSnackbar from '../hoc/withSnackbar';

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
    document.title = `xray | Auto Import Rule | ${storageId}`;
    this.onRefresh();
  }

  onRefresh() {
    const { openSnackBar, storageId } = this.props;
    try {
      api.getAutoImport({ storageId })
        .then((response) => this.setState({ autoImportRuleDocument: response.data }));
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
      <>
        <AutoImportRuleTitle
          removeModal={AUTOIMPORTRULE_REMOVE_MODAL}
          onRefresh={this.onRefresh}
          storageId={storageId}
          code={autoImportRuleDocument}
          codeModal="AutoImportRuleDocument"
        />
        {autoImportRuleDocument
        && (
        <AutoImportRuleCard
          onRefresh={this.onRefresh}
          storageId={storageId}
          autoImportRuleDocument={autoImportRuleDocument}
        />
        )}
        <AutoImportRuleRemove
          dialogName={AUTOIMPORTRULE_REMOVE_MODAL}
          storageId={storageId}
        />
      </>
    );
  }
}

export default withSnackbar(AutoImportRule);
