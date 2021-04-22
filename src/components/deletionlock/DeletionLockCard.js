import React from 'react';

import SquareCard from '../ui/SquareCard';
import DeletionLockEditor from './DeletionLockEditor';

export default function DeletionLockCard(props) {
  return (
    <>
      <SquareCard>
        <DeletionLockEditor
          {...props}
        />
      </SquareCard>
    </>
  );
}
