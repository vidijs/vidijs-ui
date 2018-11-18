import React from 'react';

import SquareCard from '../ui/SquareCard';
import AutoImportRuleEditor from './AutoImportRuleEditor';

export default function AutoImportRuleCard({
  storageId,
  autoImportRuleDocument,
  onRefresh,
}) {
  return (
    <SquareCard>
      <AutoImportRuleEditor
        storageId={storageId}
        autoImportRuleDocument={autoImportRuleDocument}
        onRefresh={onRefresh}
      />
    </SquareCard>
  );
}
