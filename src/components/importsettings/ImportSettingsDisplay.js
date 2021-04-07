import React from 'react';
import Divider from '@material-ui/core/Divider';

import TextGrid from '../ui/TextGrid';
import { AccessControlType } from '../access/AccessControlDisplay';

export default function ImportSettingsDisplay({ importSettingsDocument = {} }) {
  const { access: accessList = [] } = importSettingsDocument;
  return (
    <>
      <TextGrid title="ID" value={importSettingsDocument.id} />
      {
        accessList.map((access, index) => (
          <React.Fragment
            key={index} // eslint-disable-line react/no-array-index-key
          >
            <Divider />
            <AccessControlType access={access} />
          </React.Fragment>
        ))
      }
    </>
  );
}
