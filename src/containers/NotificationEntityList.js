import React from 'react';

import TitleHeader from '../components/ui/TitleHeader';
import UriListCard from '../components/ui/UriListCard';
import NotificationCreate from '../components/notification/NotificationCreate';


const NOTIFICATION_ENTITY = [
  'item',
  'collection',
  'job',
  'storage',
  'file',
  'quota',
  'group',
  'document',
];

const NOTIFICATION_CREATE_DIALOG = 'NOTIFICATION_CREATE_DIALOG';

export default function NotificationType({
  history,
}) {
  return (
    <React.Fragment>
      <TitleHeader
        title="Notification"
        helpTo="/ref/notification/notification.html"
        createModal={NOTIFICATION_CREATE_DIALOG}
      />
      <UriListCard
        uriListDocument={{ uri: NOTIFICATION_ENTITY }}
        linkTo={uri => `/notification/${uri}/`}
        titleCase
      />
      <NotificationCreate
        dialogName={NOTIFICATION_CREATE_DIALOG}
        onSuccess={(response) => {
          const { data: newUriListDocument, entityType } = response;
          const { uri } = newUriListDocument;
          const notificationId = uri[0];
          history.push(`/notification/${entityType}/${notificationId}`);
        }}
      />
    </React.Fragment>
  );
}
