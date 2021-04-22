import React from 'react';

import { storagerule as api } from '@vidispine/vdt-api';
import StorageRuleListCard from '../components/storagerule/StorageRuleListCard';
import StorageRuleEntityDialog from '../components/storagerule/StorageRuleEntityDialog';

import withSnackbar from '../hoc/withSnackbar';

const STORAGERULE_DIALOG = 'STORAGERULE_DIALOG';

class StorageRule extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.state = {
      storageRulesDocument: undefined,
    };
  }

  componentDidMount() {
    this.onRefresh();
  }

  onRefresh() {
    const { openSnackBar, entityId, entityType } = this.props;
    try {
      api.getEntityStorageRule({ entityId, entityType })
        .then((response) => this.setState({ storageRulesDocument: response.data }));
    } catch (error) {
      const messageContent = 'Error Getting Storage Rule List';
      openSnackBar({ messageContent, messageColor: 'secondary' });
    }
  }

  render() {
    const {
      entityId,
      entityType,
      titleComponent: TitleComponent,
      tabComponent: TabComponent,
    } = this.props;
    const { storageRulesDocument } = this.state;
    return (
      <>
        {TitleComponent && (
          <TitleComponent
            onRefresh={this.onRefresh}
            codeModal="StorageRulesDocument"
            code={storageRulesDocument}
            createModal={STORAGERULE_DIALOG}
          />
        )}
        {TabComponent && (
          <TabComponent />
        )}
        { storageRulesDocument && (
          <StorageRuleListCard
            onRefresh={this.onRefresh}
            storageRulesDocument={storageRulesDocument}
            createModal={TitleComponent ? undefined : STORAGERULE_DIALOG}
          />
        )}
        <StorageRuleEntityDialog
          dialogName={STORAGERULE_DIALOG}
          onSuccess={this.onRefresh}
          entityId={entityId}
          entityType={entityType}
        />
      </>
    );
  }
}

export default withSnackbar(StorageRule);
