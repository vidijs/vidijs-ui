import React from 'react';

import TextGrid from '../ui/TextGrid';
import TypeSection from '../ui/TypeSection';
import TypeArray from '../ui/TypeArray';

const LicenseErrorType = ({ value = {} }) => (
  <>
    <TextGrid
      title="licenseError"
      value={value.licenseError}
      hover
      hideNoValue
    />
  </>
);

const LicenseNumberType = ({ value = {}, dense = true }) => (
  dense
    ? (
      <TextGrid
        title={`Current: ${value.current}`}
        value={`Allowed: ${value.allowed === '-1' ? 'Unlimited' : value.allowed}`}
        hover
        hideNoValue
        titleStartCase={false}
      />
    )
    : (
      <>
        <TextGrid
          title="allowed"
          value={value.allowed}
          hover
          hideNoValue
        />
        <TextGrid
          title="current"
          value={value.current}
          hover
          hideNoValue
        />
      </>
    )
);

const CodecType = ({ value = {}, dense = true }) => (
  dense
    ? (
      <TextGrid
        title={value.name}
        value={
        `${value.encode ? 'Encode' : ''}${(value.decode && !value.encode) ? 'Decode' : ''}`
      }
        hover
        hideNoValue
        titleStartCase={false}
      />
    )
    : (
      <>
        <TextGrid
          title="name"
          value={value.name}
          hover
          hideNoValue
        />
        <TextGrid
          title="encode"
          value={value.encode}
          variant="boolean"
          hover
          hideNoValue
        />
        <TextGrid
          title="decode"
          value={value.decode}
          variant="boolean"
          hover
          hideNoValue
        />
      </>
    )
);

const CodecStatusType = ({ value = {} }) => (
  <>
    <TypeArray
      value={value.codec}
      component={CodecType}
    />
    <TextGrid
      title="codecExtraTags"
      value={value.codecExtraTags}
      hover
      hideNoValue
    />
  </>
);

const SystemInfoType = ({ value = {} }) => (
  <>
    <TextGrid
      title="macaddress"
      value={value.macaddress}
      variant="list"
      hover
      hideNoValue
    />
    <TextGrid
      title="databaseSize"
      value={value.databaseSize}
      hover
      hideNoValue
    />
  </>
);

const CompType = ({ value = {}, dense = true }) => (
  dense
    ? (
      <TextGrid
        title={value.siteId ? `${value.siteId} ${value.name}` : value.name}
        value={value.version}
        hover
        hideNoValue
        titleStartCase={false}
      />
    )
    : (
      <>
        <TextGrid
          title={value.name}
          value={value.version}
          hover
          hideNoValue
        />
        <TextGrid
          title="siteId"
          value={value.siteId}
          hover
          hideNoValue
        />
        <TextGrid
          title="version"
          value={value.version}
          hover
          hideNoValue
        />
      </>
    )
);

const LicenseType = ({ value = {} }) => (
  <>
    <TextGrid
      title="expiryDate"
      value={value.expiryDate}
      hover
      hideNoValue
    />
    <TypeSection
      title="systemInfo"
      value={value.systemInfo}
      component={SystemInfoType}
      hideNoValue
    />
    <TextGrid
      title="fileStatus"
      value={value.fileStatus}
      hover
      hideNoValue
    />
    <TypeSection
      title="storageNumber"
      value={value.storageNumber}
      component={LicenseNumberType}
      hideNoValue
    />
    <TypeSection
      title="userNumber"
      value={value.userNumber}
      component={LicenseNumberType}
      hideNoValue
    />
    <TypeSection
      title="itemNumber"
      value={value.itemNumber}
      component={LicenseNumberType}
      hideNoValue
    />
    <TypeSection
      title="transcoderNumber"
      value={value.transcoderNumber}
      component={LicenseNumberType}
      hideNoValue
    />
    <TextGrid
      title="endCustomerCompanyname"
      value={value.endCustomerCompanyname}
      hover
      hideNoValue
    />
    <TextGrid
      title="endCustomerCompanyContactEmail"
      value={value.endCustomerCompanyContactEmail}
      hover
      hideNoValue
    />
    <TextGrid
      title="resellerCompanyName"
      value={value.resellerCompanyName}
      hover
      hideNoValue
    />
    <TextGrid
      title="resellerCompanyContactEmail"
      value={value.resellerCompanyContactEmail}
      hover
      hideNoValue
    />
    <TextGrid
      title="licenseStatus"
      value={value.licenseStatus}
      hover
      hideNoValue
    />
    <TypeSection
      title="licenseErrorStatus"
      value={value.licenseErrorStatus}
      component={LicenseErrorType}
      hideNoValue
    />
    <TextGrid
      title="licenseType"
      value={value.licenseType}
      hover
      hideNoValue
    />
    <TypeSection
      title="codecStatus"
      value={value.codecStatus}
      component={CodecStatusType}
      hideNoValue
    />
  </>
);

export function VersionSystemInfoDisplay({
  versionDocument,
}) {
  return (
    <>
      <TypeSection
        title="systemInfo"
        value={versionDocument.systemInfo}
        component={SystemInfoType}
      />
    </>
  );
}

export function VersionLicenseInfoDisplay({
  versionDocument,
}) {
  return (
    <>
      <TypeSection
        title="licenseInfo"
        value={versionDocument.licenseInfo}
        component={LicenseType}
      />
    </>
  );
}

export function VersionComponentDisplay({
  versionDocument,
}) {
  return (
    <>
      <TypeArray
        value={versionDocument.component}
        component={CompType}
      />
    </>
  );
}

export default function VersionDisplay({
  versionDocument,
}) {
  return (
    <>
      <TypeSection
        title="systemInfo"
        value={versionDocument.systemInfo}
        component={SystemInfoType}
      />
      <TypeSection
        title="licenseInfo"
        value={versionDocument.licenseInfo}
        component={LicenseType}
      />
      <TypeArray
        title="component"
        value={versionDocument.component}
        component={CompType}
      />
    </>
  );
}
