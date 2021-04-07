import React from 'react';

import SquareCard from '../ui/SquareCard';
import FieldGroupEditor from './FieldGroupEditor';
import {
  FieldGroupBasicForm,
  FieldGroupSchemaForm,
  FieldGroupAccessForm,
} from './FieldGroupForm';
import {
  FieldGroupBasicDisplay,
  FieldGroupSchemaDisplay,
  FieldGroupAccessDisplay,
} from './FieldGroupDisplay';
import FieldGroupChildEditor from './FieldGroupChildEditor';
import FieldGroupFieldEditor from './FieldGroupFieldEditor';

export default function FieldGroupCard(props) {
  return (
    <>
      <SquareCard>
        <FieldGroupEditor
          title="Overview"
          formComponent={FieldGroupBasicForm}
          displayComponent={FieldGroupBasicDisplay}
          {...props}
        />
      </SquareCard>
      <SquareCard>
        <FieldGroupEditor
          title="Schema"
          formComponent={FieldGroupSchemaForm}
          displayComponent={FieldGroupSchemaDisplay}
          {...props}
        />
      </SquareCard>
      <SquareCard>
        <FieldGroupFieldEditor
          {...props}
        />
      </SquareCard>
      <SquareCard>
        <FieldGroupChildEditor
          {...props}
        />
      </SquareCard>
      <SquareCard>
        <FieldGroupEditor
          title="Access"
          formComponent={FieldGroupAccessForm}
          displayComponent={FieldGroupAccessDisplay}
          {...props}
        />
      </SquareCard>
    </>
  );
}
