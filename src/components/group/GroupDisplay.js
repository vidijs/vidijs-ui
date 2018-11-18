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
  <React.Fragment>
    <TypeSection
      title="Parent Groups"
      value={value.parentGroupList}
      component={GroupListType}
      hideNoValue
    />
  </React.Fragment>
);

export const GroupParentDisplay = ({ groupDocument }) => (
  <React.Fragment>
    <TypeSection
      component={ParentSection}
      value={groupDocument}
    />
  </React.Fragment>
);

const ChildSection = ({ value = {} }) => (
  <React.Fragment>
    <TypeSection
      title="Child Groups"
      value={value.childGroupList}
      component={GroupListType}
      hideNoValue
    />
  </React.Fragment>
);

export const GroupChildDisplay = ({ groupDocument }) => (
  <React.Fragment>
    <TypeSection
      component={ChildSection}
      value={groupDocument}
    />
  </React.Fragment>
);

const MetadataSection = ({ value = {} }) => (
  <React.Fragment>
    <TypeSection
      title="Metadata"
      value={value.metadata}
      component={SimpleMetadataType}
      hideNoValue
    />
  </React.Fragment>
);

export const GroupMetadataDisplay = ({ groupDocument }) => (
  <React.Fragment>
    <TypeSection
      component={MetadataSection}
      value={groupDocument}
    />
  </React.Fragment>
);

const GroupSection = ({ value = {} }) => (
  <React.Fragment>
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
  </React.Fragment>
);

export const GroupBasicDisplay = ({ groupDocument }) => (
  <React.Fragment>
    <TypeSection
      component={GroupSection}
      value={groupDocument}
    />
  </React.Fragment>
);

const UserType = ({ value = {} }) => (
  <React.Fragment>
    <TextGrid
      title="userName"
      value={value.userName}
      hover
    />
  </React.Fragment>
);

const UserListType = ({ value = {} }) => (
  <React.Fragment>
    <TypeArray
      value={value.user}
      component={UserType}
      dense
    />
  </React.Fragment>
);


const UserSection = ({ value = {} }) => (
  <React.Fragment>
    <TypeSection
      component={UserListType}
      value={value.userList}
      title="Users"
    />
  </React.Fragment>
);


export const GroupUserDisplay = ({ groupDocument }) => (
  <React.Fragment>
    <TypeSection
      component={UserSection}
      value={groupDocument}
    />
  </React.Fragment>
);


export default function GroupDisplay({
  groupDocument,
}) {
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
}
