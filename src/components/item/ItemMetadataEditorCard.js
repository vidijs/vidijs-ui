import React from 'react';
import CardContent from '@material-ui/core/CardContent';

import SquareCard from '../ui/SquareCard';
import ItemMetadataEditor from './ItemMetadataEditor';

export default function ItemMetadataEditorCard({ ...props }) {
  return (
    <SquareCard>
      <CardContent>
        <ItemMetadataEditor
          {...props}
        />
      </CardContent>
    </SquareCard>
  );
}
