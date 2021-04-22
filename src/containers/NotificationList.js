import React from 'react';

import { notification as api } from '@vidispine/vdt-api';
import TitleHeader from '../components/ui/TitleHeader';
import NotificationListCard from '../components/notification/NotificationListCard';
import NotificationCreate from '../components/notification/NotificationCreate';

import withUI from '../hoc/withUI';
import capitalizeString from '../utils/capitalizeString';

const NOTIFICATION_CREATE_DIALOG = 'NOTIFICATION_CREATE_DIALOG';

class NotificationList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.onRefreshError = this.onRefreshError.bind(this);
    this.onFetch = this.onFetch.bind(this);
    this.state = {
      uriListDocument: undefined,
    };
  }

  componentDidMount() {
    const { entityType } = this.props;
    document.title = `xray | ${capitalizeString(entityType)} Notification`;
    this.onRefresh();
  }

  UNSAFE_componentWillReceiveProps({ entityType }) {
    const { entityType: prevEntityType } = this.props;
    if (prevEntityType !== entityType) {
      document.title = `xray | ${capitalizeString(entityType)} Notification`;
      this.onFetch(entityType);
    }
  }

  onRefresh() {
    const { entityType } = this.props;
    this.onFetch(entityType);
  }

  onRefreshError() {
    const { openSnackBar } = this.props;
    const messageContent = 'Error Loading Notifications';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  }

  onFetch(entityType) {
    try {
      api.listNotification({ entityType })
        .then((response) => this.setState({ uriListDocument: response.data }))
        .catch((error) => this.onRefreshError(error));
    } catch (error) {
      this.onRefreshError(error);
    }
  }

  render() {
    const {
      entityType,
      history,
    } = this.props;
    const { uriListDocument } = this.state;
    return (
      <>
        <TitleHeader
          title={capitalizeString(entityType)}
          parentTitle="Notification"
          parentTo="/notification/"
          helpTo="/ref/notification/index.html"
          onRefresh={this.onRefresh}
          code={uriListDocument}
          codeModal="URIListDocument"
          createModal={NOTIFICATION_CREATE_DIALOG}
          entityType={entityType}
        />
        <NotificationListCard
          uriListDocument={uriListDocument}
          entityType={entityType}
        />
        <NotificationCreate
          dialogName={NOTIFICATION_CREATE_DIALOG}
          entityType={entityType}
          onSuccess={(response) => {
            const { data: newUriListDocument } = response;
            const { uri } = newUriListDocument;
            const notificationId = uri[0];
            history.push(`/notification/${entityType}/${notificationId}`);
          }}
        />
      </>
    );
  }
}

export default withUI(NotificationList);
