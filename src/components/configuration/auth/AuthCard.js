import React from 'react';

import SquareCard from '../../ui/SquareCard';
import AuthEditor from './AuthEditor';

export default function AuthCard(props) {
  return (
    <SquareCard>
      <AuthEditor
        {...props}
      />
    </SquareCard>
  );
}
