import React from 'react';
import CardContent from '@material-ui/core/CardContent';

import SquareCard from '../ui/SquareCard';
import { AccessControlMergedType } from './AccessControlMergedDisplay';

export default function AccessControlMergedList({
  accessControlMergedDocument = {},
}) {
  const { access: accessList = [] } = accessControlMergedDocument;
  return (
    <>
      {
        accessList.map((access, index) => (
          <SquareCard
            key={index} // eslint-disable-line react/no-array-index-key
          >
            <CardContent>
              <AccessControlMergedType access={access} />
            </CardContent>
          </SquareCard>
        ))
      }
    </>
  );
}
