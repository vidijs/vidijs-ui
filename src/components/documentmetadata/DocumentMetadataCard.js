import React from 'react';
import CardContent from '@material-ui/core/CardContent';

import SquareCard from '../ui/SquareCard';
import DocumentMetadataEditor from './DocumentMetadataEditor';

export default function DocumentMetadataCard({ ...props }) {
  return (
    <SquareCard>
      <CardContent>
        <DocumentMetadataEditor
          {...props}
        />
      </CardContent>
    </SquareCard>
  );
}
