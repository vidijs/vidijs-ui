import React from 'react';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Delete from '@material-ui/icons/Delete';

import SquareCard from '../ui/SquareCard';
import QuotaDisplay from './QuotaDisplay';
import ExternalIdLink from '../externalid/ExternalIdLink';

export default function AccessControlCard({
  quotaRuleDocument,
  openRemove,
}) {
  const { id: ruleId } = quotaRuleDocument;
  return (
    <SquareCard>
      <CardContent>
        <CardHeader
          subheader={ruleId}
          action={(
            <>
              <IconButton onClick={openRemove(ruleId)}>
                <Delete />
              </IconButton>
              <ExternalIdLink entityId={ruleId} entityType="quota" />
            </>
          )}
        />
        <CardContent>
          <QuotaDisplay
            quotaRuleDocument={quotaRuleDocument}
          />
        </CardContent>
      </CardContent>
    </SquareCard>
  );
}
