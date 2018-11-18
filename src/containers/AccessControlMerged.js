import React from 'react';

import AccessControlMergedList from '../components/access/AccessControlMergedList';
import { access as api } from '@vidijs/vidijs-api';


export default class AccessControlMerged extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.state = {
      accessControlMergedDocument: undefined,
    };
  }

  componentDidMount() {
    this.onRefresh();
  }

  onRefresh() {
    const { openSnackBar, entityId, entityType } = this.props;
    try {
      api.getEntityAccessMerged({
        entityType,
        entityId,
      })
        .then(response => response.json())
        .then(accessControlMergedDocument => this.setState({ accessControlMergedDocument }));
    } catch (error) {
      const messageContent = 'Error Loading Merged Access List';
      openSnackBar({ messageContent, messageColor: 'secondary' });
    }
  }

  render() {
    const {
      accessControlMergedDocument,
    } = this.state;
    const {
      titleComponent: TitleComponent,
      tabComponent: TabComponent,
    } = this.props;
    return (
      <React.Fragment>
        {TitleComponent && (
          <TitleComponent
            onRefresh={this.onRefresh}
            codeModal="AccessControlMergedDocument"
            code={accessControlMergedDocument}
          />
        )}
        {TabComponent && (
          <TabComponent />
        )}
        <AccessControlMergedList
          accessControlMergedDocument={accessControlMergedDocument}
        />
      </React.Fragment>
    );
  }
}
