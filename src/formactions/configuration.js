import { SubmissionError } from 'redux-form';

import { configuration as api } from '@vidispine/vdt-api';

export function onUpdatePropertiesConfiguration(form) {
  const { configurationPropertyDocument } = form;
  return api.updatePropertiesConfiguration({
    configurationPropertyDocument,
  })
    .then(() => ({ configurationPropertyDocument }))
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}

export function onUpdateIndexingConfiguration(form) {
  const { indexingConfigurationDocument } = form;
  return api.updateIndexingConfiguration({ indexingConfigurationDocument })
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}

export function onUpdateJobPoolConfiguration(form) {
  const { jobPoolListDocument } = form;
  return api.updateJobPoolConfiguration({ jobPoolListDocument })
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}

export function onUpdateFtpPoolConfiguration(form) {
  const { ftpPoolConfigurationDocument } = form;
  return api.updateFtpPoolConfiguration({ ftpPoolConfigurationDocument })
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}

export function onUpdateMetricsConfiguration(form) {
  const { metricsConfigurationDocument } = form;
  return api.updateMetricsConfiguration({ metricsConfigurationDocument })
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}
export function onUpdatePathAliasConfiguration(form) {
  const { pathAliasConfigurationDocument } = form;
  return api.updatePathAliasConfiguration({ pathAliasConfigurationDocument })
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}

export function onUpdateLogReportConfiguration(form) {
  const { logReportConfigurationDocument } = form;
  return api.updateLogReportConfiguration({ logReportConfigurationDocument })
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}

export function onUpdateDatabasePurgingConfiguration(form) {
  const { databasePurgingConfigurationDocument } = form;
  return api.updateDatabasePurgingConfiguration({ databasePurgingConfigurationDocument })
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}

export function onUpdateCorsConfiguration(form) {
  const { corsConfigurationDocument } = form;
  return api.updateCorsConfiguration({ corsConfigurationDocument })
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}

export function onUpdateAuthConfiguration(form) {
  const { oAuth2ConfigurationDocument } = form;
  return api.updateAuthConfiguration({ oAuth2ConfigurationDocument })
    .catch((error) => {
      let errorMessage = error.message;
      if (error.response) {
        errorMessage = JSON.stringify(error.response.data, (k, v) => (v === null ? undefined : v));
      }
      throw new SubmissionError({ _error: errorMessage });
    });
}
