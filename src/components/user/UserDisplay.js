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

const MetadataSection = ({ value = {} }) => (
  <React.Fragment>
    <TypeSection
      value={value.metadata}
      component={SimpleMetadataType}
      hideNoValue
    />
  </React.Fragment>
);

export const UserMetadataDisplay = ({ userDocument }) => (
  <React.Fragment>
    <TypeSection
      component={MetadataSection}
      value={userDocument}
    />
  </React.Fragment>
);

const GroupSection = ({ value = {} }) => (
  <React.Fragment>
    <TypeSection
      component={GroupListType}
      value={value.groupList}
      title="Groups"
    />
  </React.Fragment>
);

export const UserGroupDisplay = ({ userDocument }) => (
  <React.Fragment>
    <TypeSection
      component={GroupSection}
      value={userDocument}
    />
  </React.Fragment>
);

const UserSection = ({ value = {} }) => (
  <React.Fragment>
    <TextGrid
      title="userName"
      value={value.userName}
      hover
    />
    <TextGrid
      title="realName"
      value={value.realName}
      hover
    />
    <TextGrid
      title="alias"
      value={value.alias}
      variant="list"
      hideNoValue
      hover
    />
    <TextGrid
      title="id"
      value={value.id}
      hideNoValue
      hover
    />
    <TextGrid
      title="loc"
      hideNoValue
      value={value.loc}
      hover
    />
    <TextGrid
      title="password"
      value={value.password}
      hideNoValue
      hover
    />
    <TextGrid
      title="salt"
      value={value.salt}
      hideNoValue
      hover
    />
    <TextGrid
      title="origin"
      value={value.origin}
      hideNoValue
      hover
    />
  </React.Fragment>
);

export const UserBasicDisplay = ({ userDocument }) => (
  <React.Fragment>
    <TypeSection
      component={UserSection}
      value={userDocument}
    />
  </React.Fragment>
);

export default function UserDisplay({
  userDocument,
}) {
  return (
    <React.Fragment>
      <TypeSection
        component={UserSection}
        value={userDocument}
      />
      <TypeSection
        component={GroupSection}
        value={userDocument}
      />
      <TypeSection
        component={MetadataSection}
        value={userDocument}
      />
    </React.Fragment>
  );
}
