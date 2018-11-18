import React from 'react';
import CardContent from '@material-ui/core/CardContent';

import SquareCard from '../ui/SquareCard';
import AutoImportRuleListTable from './AutoImportRuleListTable';

export default function AutoImportListCard({
  autoImportRuleListDocument,
}) {
  return (
    <SquareCard>
      <CardContent>
        <AutoImportRuleListTable
          autoImportRuleListDocument={autoImportRuleListDocument}
        />
      </CardContent>
    </SquareCard>
  );
}
