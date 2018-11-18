import React from 'react';
import CardContent from '@material-ui/core/CardContent';

import SquareCard from '../ui/SquareCard';
import UriListTable from '../ui/UriListTable';

export default function NotificationListCard({
  uriListDocument,
  entityType,
}) {
  if (uriListDocument === undefined) { return null; }
  const linkTo = uri => `/notification/${entityType}/${uri.split('/').pop()}/`;
  const textTo = uri => uri.split('/').pop();
  return (
    <SquareCard>
      <CardContent>
        <UriListTable
          uriListDocument={uriListDocument}
          linkTo={linkTo}
          textTo={textTo}
        />
      </CardContent>
    </SquareCard>
  );
}
