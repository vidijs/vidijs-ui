import React from 'react';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

import SquareCard from '../ui/SquareCard';

import {
  VersionSystemInfoDisplay,
  VersionLicenseInfoDisplay,
  VersionComponentDisplay,
} from './VersionDisplay';

export default function VersionCard(props) {
  return (
    <>
      <SquareCard>
        <CardHeader
          title="System"
        />
        <CardContent>
          <VersionSystemInfoDisplay
            {...props}
          />
        </CardContent>
      </SquareCard>
      <SquareCard>
        <CardHeader
          title="License"
        />
        <CardContent>
          <VersionLicenseInfoDisplay
            {...props}
          />
        </CardContent>
      </SquareCard>
      <SquareCard>
        <CardHeader
          title="Component"
        />
        <CardContent>
          <VersionComponentDisplay
            {...props}
          />
        </CardContent>
      </SquareCard>
    </>
  );
}
