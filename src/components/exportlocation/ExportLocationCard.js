import React from 'react';

import SquareCard from '../ui/SquareCard';
import ExportLocationEditor from './ExportLocationEditor';

export default function FieldGroupCard(props) {
  return (
    <React.Fragment>
      <SquareCard>
        <ExportLocationEditor
          {...props}
        />
      </SquareCard>
    </React.Fragment>
  );
}
