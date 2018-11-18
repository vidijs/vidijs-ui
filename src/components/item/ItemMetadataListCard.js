import React from 'react';
import CardContent from '@material-ui/core/CardContent';

import SquareCard from '../ui/SquareCard';
import ItemMetadataListEditor from './ItemMetadataListEditor';

export default function ItemMetadataEditorListCard({ ...props }) {
  return (
    <SquareCard>
      <CardContent>
        <ItemMetadataListEditor
          {...props}
        />
      </CardContent>
    </SquareCard>
  );
}
