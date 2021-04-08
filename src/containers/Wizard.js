import React from 'react';
import { compose } from 'redux';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import AccordionActions from '@material-ui/core/AccordionActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import update from 'immutability-helper';
import { version as versionApi } from '@vidispine/vdt-api';

import LicenseForm from '../components/version/LicenseForm';
import { VersionLicenseInfoDisplay } from '../components/version/VersionDisplay';
import { StorageBasicForm, StorageMethodListForm } from '../components/storage/StorageForm';
import ResourceForm from '../components/resource/ResourceForm';
import UserPasswordForm from '../components/user/UserPasswordForm';

import PropertiesForm from '../components/configuration/properties/PropertiesForm';
import ShapeTagPresetForm, { EDIT_SHAPETAG_PRESET_FORM } from '../components/shapetag/ShapeTagPresetForm';
import withUI from '../hoc/withUI';
import withFormActions from '../hoc/withFormActions';

import * as userFormActions from '../formactions/user';
import * as resourceFormActions from '../formactions/resource';
import * as shapetagFormActions from '../formactions/shapetag';
import * as licenseFormActions from '../formactions/license';
import * as storageFormActions from '../formactions/storage';
import * as configurationFormActions from '../formactions/configuration';

const EDIT_USER_PASSWORD_FORM = 'EDIT_USER_PASSWORD_FORM';
const EDIT_STORAGE_DETAILS_FORM = 'EDIT_STORAGE_DETAILS_FORM';
const EDIT_THUMBNAIL_RESOURCE_FORM = 'EDIT_THUMBNAIL_RESOURCE_FORM';
const EDIT_TRANSCODER_RESOURCE_FORM = 'EDIT_TRANSCODER_RESOURCE_FORM';
const EDIT_LICENSE_FORM = 'EDIT_LICENSE_FORM';
const EDIT_CONFIGURATIONPROPERTIES_SOLRPATH_FORM = 'EDIT_CONFIGURATIONPROPERTIES_SOLRPATH_FORM';
const EDIT_CONFIGURATIONPROPERTIES_APIURI_FORM = 'EDIT_CONFIGURATIONPROPERTIES_APIURI_FORM';

const storageInitialValues = {
  storageDocument: {
    type: 'LOCAL',
    autoDetect: true,
    showImportables: true,
    method: [{
      uri: 'file:///media/',
      read: true,
      write: true,
      browse: true,
    }],
  },
};
const transcoderInitialValues = {
  resourceDocument: {
    transcoder: {
      url: 'http://transcoder:8888/',
    },
  },
};
const thumbnailInitialValues = {
  resourceDocument: {
    thumbnail: {
      path: 'file:///thumbnail/',
    },
  },
};

function Wizard({
  openSnackBar,
  submitForm,
}) {
  const [versionDocument, setVersionDocument] = React.useState();
  const [activeStep, setActiveStep] = React.useState(0);
  const [stepsCompleted, setStepsCompleted] = React.useState([]);
  const onRefreshVersion = () => {
    try {
      versionApi.getVersion()
        .then(({ data }) => setVersionDocument(data));
    } catch (error) {
      const messageContent = 'Error Loading Version Information';
      openSnackBar({ messageContent, messageColor: 'secondary' });
    }
  };
  React.useEffect(onRefreshVersion, []);
  React.useEffect(() => { document.title = 'xray | Wizard'; }, []);

  const onBack = () => {
    if (activeStep !== 0) setActiveStep(activeStep - 1);
  };

  const onNext = () => setActiveStep(activeStep + 1);
  const onComplete = (stepName) => setStepsCompleted([stepName, ...stepsCompleted]);

  const onSubmitSuccess = ({
    stepName,
    messageContent,
    action,
    canRetry = false,
  }) => {
    openSnackBar({ messageContent });
    if (canRetry === false) {
      onNext();
      onComplete(stepName);
    }
    if (action) action();
  };

  const onSubmitFail = ({
    stepName,
    messageContent,
    action,
    canRetry = false,
  }) => {
    openSnackBar({ messageContent, messageColor: 'secondary' });
    if (canRetry === false) {
      onNext();
      onComplete(stepName);
    }
    if (action) action();
  };

  return (
    <Stepper activeStep={activeStep} orientation="vertical">
      <Step>
        <StepLabel>Set Admin Password</StepLabel>
        <StepContent>
          <UserPasswordForm
            userName="admin"
            onSubmit={userFormActions.onUpdatePassword}
            initialValues={{ passwordType: 'raw' }}
            onSubmitFail={() => onSubmitFail({ stepName: EDIT_USER_PASSWORD_FORM, messageContent: 'Error Changing Password', canRetry: true })}
            onSubmitSuccess={() => onSubmitSuccess({ stepName: EDIT_USER_PASSWORD_FORM, messageContent: 'Password Changed' })}
            form={EDIT_USER_PASSWORD_FORM}
          />

          <AccordionActions>
            <Button
              onClick={onNext}
            >
              Skip
            </Button>
            { stepsCompleted.includes(EDIT_USER_PASSWORD_FORM) ? (
              <Typography variant="caption">
                Step completed
              </Typography>
            ) : (
              <Button
                variant="text"
                color="primary"
                onClick={() => submitForm(EDIT_USER_PASSWORD_FORM)}
              >
                Save
              </Button>
            )}
          </AccordionActions>
        </StepContent>
      </Step>
      <Step>
        <StepLabel>Upload License</StepLabel>
        <StepContent>
          {versionDocument && (
          <VersionLicenseInfoDisplay
            versionDocument={
              update(versionDocument, { licenseInfo: { $unset: ['codecStatus'] } })
            }
          />
          )}
          <LicenseForm
            form={EDIT_LICENSE_FORM}
            onSubmit={licenseFormActions.onUpdate}
            onSubmitSuccess={() => onSubmitSuccess({ stepName: EDIT_LICENSE_FORM, messageContent: 'License Updated' })}
            onSubmitFail={() => onSubmitFail({ stepName: EDIT_LICENSE_FORM, messageContent: 'Error Updating License', canRetry: true })}
          />
          <AccordionActions>
            <Button onClick={onBack}>
              Back
            </Button>
            <Button
              onClick={onNext}
            >
              Skip
            </Button>
            { stepsCompleted.includes(EDIT_LICENSE_FORM) ? (
              <Typography variant="caption">
                Step completed
              </Typography>
            ) : (
              <Button
                variant="text"
                color="primary"
                onClick={() => submitForm(EDIT_LICENSE_FORM)}
              >
                Upload
              </Button>
            )}
          </AccordionActions>
        </StepContent>
      </Step>
      <Step>
        <StepLabel>Add Storage</StepLabel>
        <StepContent>
          <StorageBasicForm
            form={EDIT_STORAGE_DETAILS_FORM}
            onSubmit={storageFormActions.onCreate}
            initialValues={storageInitialValues}
            showMethod
            onSubmitSuccess={() => onSubmitSuccess({ stepName: EDIT_STORAGE_DETAILS_FORM, messageContent: 'Storage Added' })}
            onSubmitFail={() => onSubmitFail({ stepName: EDIT_STORAGE_DETAILS_FORM, messageContent: 'Error Adding Storage' })}
          />
          <StorageMethodListForm
            form={EDIT_STORAGE_DETAILS_FORM}
            onSubmit={storageFormActions.onCreate}
            initialValues={storageInitialValues}
            showMethod
            onSubmitSuccess={() => onSubmitSuccess({ stepName: EDIT_STORAGE_DETAILS_FORM, messageContent: 'Storage Added' })}
            onSubmitFail={() => onSubmitFail({ stepName: EDIT_STORAGE_DETAILS_FORM, messageContent: 'Error Adding Storage' })}
          />
          <AccordionActions>
            <Button onClick={onBack}>
              Back
            </Button>
            <Button
              onClick={onNext}
            >
              Skip
            </Button>
            { stepsCompleted.includes(EDIT_STORAGE_DETAILS_FORM) ? (
              <Typography variant="caption">
                Step completed
              </Typography>
            ) : (
              <Button
                variant="text"
                color="primary"
                onClick={() => submitForm(EDIT_STORAGE_DETAILS_FORM)}
              >
                Save
              </Button>
            )}
          </AccordionActions>
        </StepContent>
      </Step>
      <Step>
        <StepLabel>Add Transcoder</StepLabel>
        <StepContent>
          <ResourceForm
            form={EDIT_TRANSCODER_RESOURCE_FORM}
            resourceType="transcoder"
            initialValues={transcoderInitialValues}
            onSubmit={resourceFormActions.onCreate}
            onSubmitSuccess={() => onSubmitSuccess({ stepName: EDIT_TRANSCODER_RESOURCE_FORM, messageContent: 'Transcoder Added' })}
            onSubmitFail={() => onSubmitFail({ stepName: EDIT_TRANSCODER_RESOURCE_FORM, messageContent: 'Error Adding Transcoder' })}
          />
          <AccordionActions>
            <Button onClick={onBack}>
              Back
            </Button>
            <Button
              onClick={onNext}
            >
              Skip
            </Button>
            { stepsCompleted.includes(EDIT_TRANSCODER_RESOURCE_FORM) ? (
              <Typography variant="caption">
                Step completed
              </Typography>
            ) : (
              <Button
                variant="text"
                color="primary"
                onClick={() => submitForm(EDIT_TRANSCODER_RESOURCE_FORM)}
              >
                Save
              </Button>
            )}
          </AccordionActions>
        </StepContent>
      </Step>
      <Step>
        <StepLabel>Add Thumbnail Store</StepLabel>
        <StepContent>
          <ResourceForm
            form={EDIT_THUMBNAIL_RESOURCE_FORM}
            resourceType="thumbnail"
            initialValues={thumbnailInitialValues}
            onSubmit={resourceFormActions.onCreate}
            onSubmitSuccess={() => onSubmitSuccess({ stepName: EDIT_THUMBNAIL_RESOURCE_FORM, messageContent: 'Thumbnail Store Added' })}
            onSubmitFail={() => onSubmitFail({ stepName: EDIT_THUMBNAIL_RESOURCE_FORM, messageContent: 'Error Adding Thumbnail Store' })}
          />
          <AccordionActions>
            <Button onClick={onBack}>
              Back
            </Button>
            <Button
              onClick={onNext}
            >
              Skip
            </Button>
            { stepsCompleted.includes(EDIT_THUMBNAIL_RESOURCE_FORM) ? (
              <Typography variant="caption">
                Step completed
              </Typography>
            ) : (
              <Button
                variant="text"
                color="primary"
                onClick={() => submitForm(EDIT_THUMBNAIL_RESOURCE_FORM)}
              >
                Save
              </Button>
            )}
          </AccordionActions>
        </StepContent>
      </Step>
      <Step>
        <StepLabel>Set API URL</StepLabel>
        <StepContent>
          <Typography>
            This is used by the transcoder to connect to the Vidispine API Server
          </Typography>
          <PropertiesForm
            form={EDIT_CONFIGURATIONPROPERTIES_APIURI_FORM}
            onSubmit={configurationFormActions.onUpdatePropertiesConfiguration}
            initialValues={{ configurationPropertyDocument: { key: 'apiUri', value: 'http://vidispineserver:8080/API' } }}
            onSubmitSuccess={() => onSubmitSuccess({ stepName: EDIT_CONFIGURATIONPROPERTIES_APIURI_FORM, messageContent: 'API URL Added' })}
            onSubmitFail={() => onSubmitFail({ stepName: EDIT_CONFIGURATIONPROPERTIES_APIURI_FORM, messageContent: 'Error Adding API URL' })}
            destroyOnUnmount
            enableReinitialize
          />

          <AccordionActions>
            <Button onClick={onBack}>
              Back
            </Button>
            <Button
              onClick={onNext}
            >
              Skip
            </Button>
            { stepsCompleted.includes(EDIT_CONFIGURATIONPROPERTIES_APIURI_FORM) ? (
              <Typography variant="caption">
                Step completed
              </Typography>
            ) : (
              <Button
                variant="text"
                color="primary"
                onClick={() => submitForm(EDIT_CONFIGURATIONPROPERTIES_APIURI_FORM)}
              >
                Save
              </Button>
            )}
          </AccordionActions>
        </StepContent>
      </Step>
      <Step>
        <StepLabel>Add Solr Server</StepLabel>
        <StepContent>
          <PropertiesForm
            form={EDIT_CONFIGURATIONPROPERTIES_SOLRPATH_FORM}
            onSubmit={configurationFormActions.onUpdatePropertiesConfiguration}
            initialValues={{ configurationPropertyDocument: { key: 'solrPath', value: 'http://solr:8983/solr' } }}
            onSubmitSuccess={() => onSubmitSuccess({ stepName: EDIT_CONFIGURATIONPROPERTIES_SOLRPATH_FORM, messageContent: 'Solr Server Added' })}
            onSubmitFail={() => onSubmitFail({ stepName: EDIT_CONFIGURATIONPROPERTIES_SOLRPATH_FORM, messageContent: 'Error Adding Solr Server' })}
            destroyOnUnmount
            enableReinitialize
          />

          <AccordionActions>
            <Button onClick={onBack}>
              Back
            </Button>
            <Button
              onClick={onNext}
            >
              Skip
            </Button>
            { stepsCompleted.includes(EDIT_CONFIGURATIONPROPERTIES_SOLRPATH_FORM) ? (
              <Typography variant="caption">
                Step completed
              </Typography>
            ) : (
              <Button
                variant="text"
                color="primary"
                onClick={() => submitForm(EDIT_CONFIGURATIONPROPERTIES_SOLRPATH_FORM)}
              >
                Save
              </Button>
            )}
          </AccordionActions>
        </StepContent>
      </Step>
      <Step>
        <StepLabel>Add Preset Shape Tags</StepLabel>
        <StepContent>
          <ShapeTagPresetForm
            onSubmit={shapetagFormActions.onCreatePreset}
            onSubmitSuccess={() => onSubmitSuccess({ stepName: EDIT_SHAPETAG_PRESET_FORM, messageContent: 'Shape Tags Created' })}
            onSubmitFail={() => onSubmitFail({ stepName: EDIT_SHAPETAG_PRESET_FORM, messageContent: 'Error Creating Shape Tags' })}
          />
          <AccordionActions>
            <Button onClick={onBack}>
              Back
            </Button>
            <Button
              onClick={onNext}
            >
              Skip
            </Button>
            { stepsCompleted.includes(EDIT_SHAPETAG_PRESET_FORM) ? (
              <Typography variant="caption">
                Step completed
              </Typography>
            ) : (
              <Button
                variant="text"
                color="primary"
                onClick={() => submitForm(EDIT_SHAPETAG_PRESET_FORM)}
              >
                Save
              </Button>
            )}
          </AccordionActions>
        </StepContent>
      </Step>
      <Step>
        <StepLabel>Complete</StepLabel>
        <StepContent>
          All steps complete.
          <AccordionActions>
            <Button onClick={onBack}>
              Back
            </Button>
            <Button
              component={Link}
              to="/selftest"
              variant="text"
              color="primary"
            >
              Self Test
            </Button>
          </AccordionActions>
        </StepContent>
      </Step>
    </Stepper>
  );
}

export default compose(withFormActions, withUI)(Wizard);
