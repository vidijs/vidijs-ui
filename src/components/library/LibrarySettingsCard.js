import React from 'react';
import CardContent from '@material-ui/core/CardContent';

import SquareCard from '../ui/SquareCard';
import LibrarySettingsEditor from './LibrarySettingsEditor';

export default function LibrarySettingsCard({ ...props }) {
  return (
    <SquareCard>
      <CardContent>
        <LibrarySettingsEditor
          {...props}
        />
      </CardContent>
    </SquareCard>
  );
}
