import React from 'react';

import NotificationCard from '../components/notification/NotificationCard';
import NotificationRemove from '../components/notification/NotificationRemove';
import capitalizeString from '../utils/capitalizeString';
import withSnackbar from '../hoc/withSnackbar';
import TitleHeader from '../components/ui/TitleHeader';

import { notification as api } from '@vidijs/vidijs-api';

const NOTIFICATION_REMOVE_DIALOG = 'NOTIFICATION_REMOVE_DIALOG';

class Notification extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.onRefreshError = this.onRefreshError.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.state = {
      notificationDocument: undefined,
      isEditing: false,
    };
  }

  componentDidMount() {
    const { entityType, notificationId } = this.props;
    document.title = `vidi.js | Notification ${capitalizeString(entityType)} | ${notificationId}`;
    this.onRefresh();
  }

  onRefresh() {
    const {
      entityType,
      notificationId,
    } = this.props;
    try {
      api.getNotification({ notificationId, entityType })
        .then(response => this.setState({ notificationDocument: response.data }))
        .catch(error => this.onRefreshError(error));
    } catch (error) {
      this.onRefreshError(error);
    }
  }

  onRefreshError() {
    const { openSnackBar } = this.props;
    const messageContent = 'Error Loading Notification';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  }


  toggleEdit() {
    const { isEditing: currentIsEditing } = this.state;
    this.setState({ isEditing: !currentIsEditing });
  }

  render() {
    const {
      notificationId,
      entityType,
      history,
    } = this.props;
    const {
      notificationDocument,
      isEditing,
    } = this.state;
    return (
      <React.Fragment>
        <TitleHeader
          title={notificationId}
          parentTitle={capitalizeString(entityType)}
          parentTo={`/notification/${entityType}/`}
          grandParentTitle="Notification"
          grandParentTo="/notification/"
          helpTo="/ref/notification/index.html"
          onRefresh={this.onRefresh}
          code={notificationDocument}
          codeModal="NotificationDocument"
          entityId={`notification/${notificationId}`}
          entityType={entityType}
          removeModal={NOTIFICATION_REMOVE_DIALOG}
        />
        <NotificationCard
          notificationDocument={notificationDocument}
          entityType={entityType}
          notificationId={notificationId}
          isEditing={isEditing}
          toggleEdit={this.toggleEdit}
          onRefresh={this.onRefresh}
        />
        <NotificationRemove
          dialogName={NOTIFICATION_REMOVE_DIALOG}
          onSuccess={() => history.push(`/notification/${entityType}/`)}
          entityType={entityType}
          notificationId={notificationId}
        />
      </React.Fragment>
    );
  }
}

export default withSnackbar(Notification);
