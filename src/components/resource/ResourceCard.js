import React from 'react';
import CardContent from '@material-ui/core/CardContent';

import SquareCard from '../ui/SquareCard';
import ResourceEditor from './ResourceEditor';

export default function ImportSettingsCard({
  resourceType,
  resourceId,
  resourceDocument,
  onRefresh,
}) {
  return (
    <SquareCard>
      <CardContent>
        <ResourceEditor
          resourceId={resourceId}
          resourceType={resourceType}
          resourceDocument={resourceDocument}
          onRefresh={onRefresh}
        />
      </CardContent>
    </SquareCard>
  );
}
