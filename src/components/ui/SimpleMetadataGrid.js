import React from 'react';

import SimpleMetadataEditor from './SimpleMetadataEditor';
import SimpleMetadataDisplay from './SimpleMetadataDisplay';

export default function SimpleMetadataGrid(props) {
  if (props.editable) {
    return <SimpleMetadataEditor {...props} />;
  }
  return <SimpleMetadataDisplay {...props} />;
}
