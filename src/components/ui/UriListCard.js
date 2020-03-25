import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';

import SquareCard from './SquareCard';
import UriListTable from './UriListTable';

export default function UriListCard({ title, uriListDocument, ...props }) {
  if (uriListDocument === undefined) { return null; }
  return (
    <SquareCard>
      {title && (
        <CardHeader
          disableTypography
          title={(
            <Typography variant="subtitle1">{title}</Typography>
          )}
        />
      )}
      <CardContent>
        <UriListTable
          uriListDocument={uriListDocument}
          {...props}
        />
      </CardContent>
    </SquareCard>
  );
}
