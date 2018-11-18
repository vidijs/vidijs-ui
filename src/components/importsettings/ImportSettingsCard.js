import React from 'react';
import CardContent from '@material-ui/core/CardContent';

import SquareCard from '../ui/SquareCard';
import ImportSettingsEditor from './ImportSettingsEditor';

export default function ImportSettingsCard({
  settingsId,
  importSettingsDocument,
  onRefresh,
}) {
  return (
    <SquareCard>
      <CardContent>
        <ImportSettingsEditor
          settingsId={settingsId}
          importSettingsDocument={importSettingsDocument}
          onRefresh={onRefresh}
        />
      </CardContent>
    </SquareCard>
  );
}
