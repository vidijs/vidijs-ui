import React from 'react';

import SquareCard from '../ui/SquareCard';
import StorageEditor from './StorageEditor';
import StorageMethodList from './StorageMethodList';
import {
  StorageBasicForm,
  StorageMetadataForm,
  StorageAdvancedForm,
  StorageScriptForm,
} from './StorageForm';
import {
  StorageBasicDisplay,
  StorageAdvancedDisplay,
  StorageMetadataDisplay,
  StorageScriptDisplay,
} from './StorageDisplay';

export default function StorageCard(props) {
  return (
    <>
      <SquareCard>
        <StorageEditor
          title="Settings"
          formComponent={StorageBasicForm}
          displayComponent={StorageBasicDisplay}
          {...props}
        />
      </SquareCard>
      <SquareCard>
        <StorageMethodList
          {...props}
        />
      </SquareCard>
      <SquareCard>
        <StorageEditor
          title="Advanced"
          formComponent={StorageAdvancedForm}
          displayComponent={StorageAdvancedDisplay}
          {...props}
        />
      </SquareCard>
      <SquareCard>
        <StorageEditor
          title="Metadata"
          formComponent={StorageMetadataForm}
          displayComponent={StorageMetadataDisplay}
          {...props}
        />
      </SquareCard>
      <SquareCard>
        <StorageEditor
          title="Scripts"
          formComponent={StorageScriptForm}
          displayComponent={StorageScriptDisplay}
          {...props}
        />
      </SquareCard>
    </>
  );
}
