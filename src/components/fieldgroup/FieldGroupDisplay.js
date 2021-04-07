import React from 'react';

import TextGrid from '../ui/TextGrid';
import TypeSection from '../ui/TypeSection';
import TypeArray from '../ui/TypeArray';

import { KeyValuePairType } from '../ui/FormType';
import { MetadataSchemaElementType, MetadataFieldType } from '../metadatafield/MetadataFieldDisplay';

const MetadataFieldAccessControlType = ({ value = {} }) => (
  <>
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
  </>
);

const BasicSection = ({ value = {} }) => (
  <>
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
  </>
);

const SchemaSection = ({ value = {} }) => (
  <>
    <TypeSection
      title="schema"
      value={value.schema}
      component={MetadataSchemaElementType}
      hideNoValue
    />
  </>
);

const DataSection = ({ value = {} }) => (
  <>
    <TypeSection
      title="data"
      value={value.data}
      component={KeyValuePairType}
      hideNoValue
    />
  </>
);

const AccessSection = ({ value = {} }) => (
  <>
    <TypeArray
      title="access"
      value={value.access}
      component={MetadataFieldAccessControlType}
    />
  </>
);

const FieldSection = ({ value = {} }) => (
  <>
    <TypeArray
      arrayTitle="Child Fields"
      titleKey="name"
      titleStartCase={false}
      value={value.field}
      component={MetadataFieldType}
    />
  </>
);

const MetadataFieldGroupType = ({ value = {} }) => (
  <>
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
  </>
);

const GroupSection = ({ value = {} }) => (
  <>
    <TypeArray
      arrayTitle="Child Groups"
      titleKey="name"
      titleStartCase={false}
      value={value.group}
      component={MetadataFieldGroupType}
    />
  </>
);

export const FieldGroupBasicDisplay = ({ metadataFieldGroupDocument }) => (
  <>
    <TypeSection
      component={BasicSection}
      value={metadataFieldGroupDocument}
    />
  </>
);

export const FieldGroupSchemaDisplay = ({ metadataFieldGroupDocument }) => (
  <>
    <TypeSection
      component={SchemaSection}
      value={metadataFieldGroupDocument}
    />
  </>
);

export const FieldGroupGroupDisplay = ({ metadataFieldGroupDocument }) => (
  <>
    <TypeSection
      component={GroupSection}
      value={metadataFieldGroupDocument}
    />
  </>
);

export const FieldGroupDataDisplay = ({ metadataFieldGroupDocument }) => (
  <>
    <TypeSection
      component={DataSection}
      value={metadataFieldGroupDocument}
    />
  </>
);

export const FieldGroupAccessDisplay = ({ metadataFieldGroupDocument }) => (
  <>
    <TypeSection
      component={AccessSection}
      value={metadataFieldGroupDocument}
    />
  </>
);

export const FieldGroupFieldDisplay = ({ metadataFieldGroupDocument }) => (
  <>
    <TypeSection
      component={FieldSection}
      value={metadataFieldGroupDocument}
    />
  </>
);

export default function FieldGroupDisplay({
  metadataFieldGroupDocument,
}) {
  return (
    <>
      <TypeSection
        component={MetadataFieldGroupType}
        value={metadataFieldGroupDocument}
      />
    </>
  );
}
