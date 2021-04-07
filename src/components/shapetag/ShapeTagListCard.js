import React from 'react';
import CardContent from '@material-ui/core/CardContent';

import SquareCard from '../ui/SquareCard';
import UriListTable from '../ui/UriListTable';

export default function ShapeTagListCard({
  uriListDocument,
}) {
  const linkTo = (uri) => `/shape-tag/${uri}/`;
  return (
    <SquareCard>
      <CardContent>
        <UriListTable
          uriListDocument={uriListDocument}
          linkTo={linkTo}
        />
      </CardContent>
    </SquareCard>
  );
}
