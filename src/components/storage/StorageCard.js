import React from 'react';
import Card from '@material-ui/core/Card';

import CardList from '../ui/CardList';
import StorageEditor from './StorageEditor';
import StorageMetadataEditor from './StorageMetadataEditor';
import StorageMethodList from './StorageMethodList';
import {
  StorageBasicForm,
  StorageAdvancedForm,
  StorageScriptForm,
} from './StorageForm';
import {
  StorageBasicDisplay,
  StorageAdvancedDisplay,
  StorageScriptDisplay,
} from './StorageDisplay';

export default function StorageCard(props) {
  return (
    <CardList>
      <Card>
        <StorageEditor
          title="Settings"
          formComponent={StorageBasicForm}
          displayComponent={StorageBasicDisplay}
          {...props}
        />
      </Card>
      <Card>
        <StorageMethodList
          {...props}
        />
      </Card>
      <Card>
        <StorageEditor
          title="Advanced"
          formComponent={StorageAdvancedForm}
          displayComponent={StorageAdvancedDisplay}
          {...props}
        />
      </Card>
      <Card>
        <StorageMetadataEditor
          {...props}
        />
      </Card>
      <Card>
        <StorageEditor
          title="Scripts"
          formComponent={StorageScriptForm}
          displayComponent={StorageScriptDisplay}
          {...props}
        />
      </Card>
    </CardList>
  );
}
