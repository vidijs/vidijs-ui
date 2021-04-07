import React from 'react';

import TextGrid from '../../ui/TextGrid';
import TypeSection from '../../ui/TypeSection';
import TypeArray from '../../ui/TypeArray';
import { KeyValuePairType } from '../../ui/DisplayType';

const CORSConfigurationEntryRequest = ({ value = {} }) => (
  <>
    <TextGrid
      title="method"
      value={value.method}
      variant="list"
      hover
    />
    <TextGrid
      title="origin"
      value={value.origin}
      variant="list"
      hover
    />
    <TextGrid
      title="originRegex"
      value={value.originRegex}
      variant="list"
      hover
    />
    <TextGrid
      title="pathRegex"
      value={value.pathRegex}
      variant="list"
      hover
    />
    <TypeArray
      title="headerRegex"
      value={value.headerRegex}
      component={KeyValuePairType}
    />
  </>
);

const CORSConfigurationEntryResponse = ({ value = {} }) => (
  <>
    <TextGrid
      title="allowOrigin"
      value={value.allowOrigin}
      hover
    />
    <TextGrid
      title="allowMethods"
      value={value.allowMethods}
      variant="list"
      hover
    />
    <TextGrid
      title="allowHeaders"
      value={value.allowHeaders}
      variant="list"
      hover
    />
    <TextGrid
      title="allowMaxAge"
      value={value.allowMaxAge}
      hover
    />
    <TypeArray
      title="allowOtherHeader"
      value={value.allowOtherHeader}
      component={KeyValuePairType}
    />
  </>
);

const CORSConfigurationEntry = ({ value = {} }) => (
  <>
    <TypeArray
      title="request"
      value={value.request}
      component={CORSConfigurationEntryRequest}
    />
    <TypeSection
      title="response"
      value={value.response}
      component={CORSConfigurationEntryResponse}
    />
  </>
);

const CORSConfigurationType = ({ value = {} }) => (
  <>
    <TypeArray
      title="entry"
      value={value.entry}
      component={CORSConfigurationEntry}
    />
  </>
);

export default function CorsDisplay({
  corsConfigurationDocument,
}) {
  return (
    <>
      <TypeSection
        value={corsConfigurationDocument}
        component={CORSConfigurationType}
      />
    </>
  );
}
