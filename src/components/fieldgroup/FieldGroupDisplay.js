import React from 'react';

import TextGrid from '../ui/TextGrid';
import TypeSection from '../ui/TypeSection';
import TypeArray from '../ui/TypeArray';

import { KeyValuePairType } from '../ui/FormType';
import { MetadataSchemaElementType, MetadataFieldType } from '../metadatafield/MetadataFieldDisplay';

const MetadataFieldAccessControlType = ({ value = {} }) => (
  <React.Fragment>
    <TextGrid
      title="field"
      value={value.field}
      hover
    />
    <TextGrid
      title="fieldGroup"
      value={value.fieldGroup}
      hover
    />
    <TextGrid
      title="user"
      value={value.user}
      hover
    />
    <TextGrid
      title="group"
      value={value.group}
      hover
    />
    <TextGrid
      title="permission"
      value={value.permission}
      hover
    />
  </React.Fragment>
);

const BasicSection = ({ value = {} }) => (
  <React.Fragment>
    <TextGrid
      title="name"
      value={value.name}
      hover
    />
    <TextGrid
      title="inheritance"
      value={value.inheritance}
      variant="boolean"
      hover
    />
  </React.Fragment>
);

const SchemaSection = ({ value = {} }) => (
  <React.Fragment>
    <TypeSection
      title="schema"
      value={value.schema}
      component={MetadataSchemaElementType}
      hideNoValue
    />
  </React.Fragment>
);

const DataSection = ({ value = {} }) => (
  <React.Fragment>
    <TypeSection
      title="data"
      value={value.data}
      component={KeyValuePairType}
      hideNoValue
    />
  </React.Fragment>
);

const AccessSection = ({ value = {} }) => (
  <React.Fragment>
    <TypeArray
      title="access"
      value={value.access}
      component={MetadataFieldAccessControlType}
    />
  </React.Fragment>
);

const FieldSection = ({ value = {} }) => (
  <React.Fragment>
    <TypeArray
      arrayTitle="Child Fields"
      titleKey="name"
      titleStartCase={false}
      value={value.field}
      component={MetadataFieldType}
    />
  </React.Fragment>
);


const MetadataFieldGroupType = ({ value = {} }) => (
  <React.Fragment>
    <BasicSection value={value} />
    <SchemaSection value={value} />
    <FieldSection value={value} />
    <TypeArray
      arrayTitle="Child Groups"
      titleKey="name"
      titleStartCase={false}
      value={value.group}
      component={MetadataFieldGroupType}
    />
    <DataSection value={value} />
    <AccessSection value={value} />
  </React.Fragment>
);

const GroupSection = ({ value = {} }) => (
  <React.Fragment>
    <TypeArray
      arrayTitle="Child Groups"
      titleKey="name"
      titleStartCase={false}
      value={value.group}
      component={MetadataFieldGroupType}
    />
  </React.Fragment>
);


export const FieldGroupBasicDisplay = ({ metadataFieldGroupDocument }) => (
  <React.Fragment>
    <TypeSection
      component={BasicSection}
      value={metadataFieldGroupDocument}
    />
  </React.Fragment>
);

export const FieldGroupSchemaDisplay = ({ metadataFieldGroupDocument }) => (
  <React.Fragment>
    <TypeSection
      component={SchemaSection}
      value={metadataFieldGroupDocument}
    />
  </React.Fragment>
);

export const FieldGroupGroupDisplay = ({ metadataFieldGroupDocument }) => (
  <React.Fragment>
    <TypeSection
      component={GroupSection}
      value={metadataFieldGroupDocument}
    />
  </React.Fragment>
);

export const FieldGroupDataDisplay = ({ metadataFieldGroupDocument }) => (
  <React.Fragment>
    <TypeSection
      component={DataSection}
      value={metadataFieldGroupDocument}
    />
  </React.Fragment>
);

export const FieldGroupAccessDisplay = ({ metadataFieldGroupDocument }) => (
  <React.Fragment>
    <TypeSection
      component={AccessSection}
      value={metadataFieldGroupDocument}
    />
  </React.Fragment>
);

export const FieldGroupFieldDisplay = ({ metadataFieldGroupDocument }) => (
  <React.Fragment>
    <TypeSection
      component={FieldSection}
      value={metadataFieldGroupDocument}
    />
  </React.Fragment>
);


export default function FieldGroupDisplay({
  metadataFieldGroupDocument,
}) {
  return (
    <React.Fragment>
      <TypeSection
        component={MetadataFieldGroupType}
        value={metadataFieldGroupDocument}
      />
    </React.Fragment>
  );
}
