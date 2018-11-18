import React from 'react';

import SquareCard from '../../ui/SquareCard';
import LogReportEditor from './LogReportEditor';

export default function LogReportCard(props) {
  return (
    <SquareCard>
      <LogReportEditor
        {...props}
      />
    </SquareCard>
  );
}
