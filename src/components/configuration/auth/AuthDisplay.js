import React from 'react';

import TextGrid from '../../ui/TextGrid';
import TypeSection from '../../ui/TypeSection';

const OAuth2ConfigurationType = ({ value = {} }) => (
  <>
    <TextGrid
      title="federationMetadataURI"
      value={value.federationMetadataURI}
      hover
    />
    <TextGrid
      title="federationMetadataInterval"
      value={value.federationMetadataInterval}
      hover
    />
    <TextGrid
      title="expectedAudience"
      value={value.expectedAudience}
      hover
    />
    <TextGrid
      title="validationEndpoint"
      value={value.validationEndpoint}
      hover
    />
    <TextGrid
      title="tokenUser"
      value={value.tokenUser}
      hover
    />
    <TextGrid
      title="x509Certificate"
      value={value.x509Certificate}
      hover
    />
  </>
);

export default function AuthDisplay({
  oAuth2ConfigurationDocument,
}) {
  return (
    <>
      <TypeSection
        value={oAuth2ConfigurationDocument}
        component={OAuth2ConfigurationType}
      />
    </>
  );
}
