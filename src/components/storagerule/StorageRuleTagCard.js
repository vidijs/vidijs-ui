import React from 'react';

import SquareCard from '../ui/SquareCard';
import StorageRuleTagEditor from './StorageRuleTagEditor';

export default function StorageRuleTagCard(props) {
  return (
    <React.Fragment>
      <SquareCard>
        <StorageRuleTagEditor
          {...props}
        />
      </SquareCard>
    </React.Fragment>
  );
}
