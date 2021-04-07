import React from 'react';

import QuotaCard from './QuotaCard';

export default function AccessControlListCard({
  quotaRuleListDocument = {},
  onRefresh,
  openRemove,
}) {
  const { rule: ruleList = [] } = quotaRuleListDocument;
  return (
    <>
      {
        ruleList.map((quotaRuleDocument) => (
          <QuotaCard
            quotaRuleDocument={quotaRuleDocument}
            key={quotaRuleDocument.id}
            onRefresh={onRefresh}
            openRemove={openRemove}
          />
        ))
      }
    </>
  );
}
