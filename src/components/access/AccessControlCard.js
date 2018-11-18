import React from 'react';
import CardContent from '@material-ui/core/CardContent';

import SquareCard from '../ui/SquareCard';
import AccessControlEditor from './AccessControlEditor';

export default function AccessControlCard({
  accessControlDocument,
  onRefresh,
  entityType,
  entityId,
  openRemove,
}) {
  return (
    <SquareCard>
      <CardContent>
        <AccessControlEditor
          accessControlDocument={accessControlDocument}
          onRefresh={onRefresh}
          entityType={entityType}
          entityId={entityId}
          openRemove={openRemove}
        />
      </CardContent>
    </SquareCard>
  );
}
