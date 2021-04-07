import React from 'react';

import TextGrid from '../ui/TextGrid';
import TypeSection from '../ui/TypeSection';
import TypeArray from '../ui/TypeArray';
import { SimpleMetadataType } from '../ui/DisplayType';

const GroupType = ({ value = {} }) => (
  <TextGrid
    title="Group Name"
    value={value.groupName}
  />
);

const GroupListType = ({ value = {} }) => (
  <TypeArray
    value={value.group}
    component={GroupType}
    dense
  />
);

const ParentSection = ({ value = {} }) => (
  <>
    <TypeSection
      title="Parent Groups"
      value={value.parentGroupList}
      component={GroupListType}
      hideNoValue
    />
  </>
);

export const GroupParentDisplay = ({ groupDocument }) => (
  <>
    <TypeSection
      component={ParentSection}
      value={groupDocument}
    />
  </>
);

const ChildSection = ({ value = {} }) => (
  <>
    <TypeSection
      title="Child Groups"
      value={value.childGroupList}
      component={GroupListType}
      hideNoValue
    />
  </>
);

export const GroupChildDisplay = ({ groupDocument }) => (
  <>
    <TypeSection
      component={ChildSection}
      value={groupDocument}
    />
  </>
);

const MetadataSection = ({ value = {} }) => (
  <>
    <TypeSection
      title="Metadata"
      value={value.metadata}
      component={SimpleMetadataType}
      hideNoValue
    />
  </>
);

export const GroupMetadataDisplay = ({ groupDocument }) => (
  <>
    <TypeSection
      component={MetadataSection}
      value={groupDocument}
    />
  </>
);

const GroupSection = ({ value = {} }) => (
  <>
    <TextGrid
      title="groupName"
      value={value.groupName}
      hover
    />
    <TextGrid
      title="description"
      value={value.description}
      hover
    />
    <TextGrid
      title="role"
      value={value.role}
      variant="boolean"
      hover
    />
  </>
);

export const GroupBasicDisplay = ({ groupDocument }) => (
  <>
    <TypeSection
      component={GroupSection}
      value={groupDocument}
    />
  </>
);

const UserType = ({ value = {} }) => (
  <>
    <TextGrid
      title="userName"
      value={value.userName}
      hover
    />
  </>
);

const UserListType = ({ value = {} }) => (
  <>
    <TypeArray
      value={value.user}
      component={UserType}
      dense
    />
  </>
);

const UserSection = ({ value = {} }) => (
  <>
    <TypeSection
      component={UserListType}
      value={value.userList}
      title="Users"
    />
  </>
);

export const GroupUserDisplay = ({ groupDocument }) => (
  <>
    <TypeSection
      component={UserSection}
      value={groupDocument}
    />
  </>
);

export default function GroupDisplay({
  groupDocument,
}) {
  return (
    <>
      <TypeSection
        component={GroupSection}
        value={groupDocument}
      />
      <TypeSection
        component={UserSection}
        value={groupDocument}
      />
      <TypeSection
        component={ChildSection}
        value={groupDocument}
      />
      <TypeSection
        component={ParentSection}
        value={groupDocument}
      />
      <TypeSection
        component={MetadataSection}
        value={groupDocument}
      />
    </>
  );
}
