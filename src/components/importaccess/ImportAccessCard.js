import React from 'react';
import CardContent from '@material-ui/core/CardContent';

import SquareCard from '../ui/SquareCard';
import ImportAccessTable from './ImportAccessTable';

export default function ImportSettingsCard({
  importAccessControlListDocument,
  openRemove,
  openEdit,
}) {
  return (
    <SquareCard>
      <CardContent>
        <ImportAccessTable
          importAccessControlListDocument={importAccessControlListDocument}
          openRemove={openRemove}
          openEdit={openEdit}
        />
      </CardContent>
    </SquareCard>
  );
}
