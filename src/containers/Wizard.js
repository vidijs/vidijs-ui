import React from 'react';
import { connect } from 'react-redux';
import { submit } from 'redux-form';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import update from 'immutability-helper';
import { version as versionApi } from '@vidijs/vidijs-api';
import { configuration as configurationApi } from '@vidijs/vidijs-api';

import * as actions from '../actions';
import LicenseForm from '../components/version/LicenseForm';
import { VersionLicenseInfoDisplay } from '../components/version/VersionDisplay';
import { StorageBasicForm, StorageMethodListForm } from '../components/storage/StorageForm';
import ResourceForm from '../components/resource/ResourceForm';
import UserPasswordForm from '../components/user/UserPasswordForm';

import PropertiesEditor from '../components/configuration/properties/PropertiesEditor';
import ShapeTagPresetForm, { EDIT_SHAPETAG_PRESET_FORM } from '../components/shapetag/ShapeTagPresetForm';


import * as userFormActions from '../formactions/user';
import * as resourceFormActions from '../formactions/resource';
import * as shapetagFormActions from '../formactions/shapetag';
import * as licenseFormActions from '../formactions/license';
import * as storageFormActions from '../formactions/storage';

const EDIT_USER_PASSWORD_FORM = 'EDIT_USER_PASSWORD_FORM';
const EDIT_STORAGE_DETAILS_FORM = 'EDIT_STORAGE_DETAILS_FORM';
const EDIT_THUMBNAIL_RESOURCE_FORM = 'EDIT_THUMBNAIL_RESOURCE_FORM';
const EDIT_TRANSCODER_RESOURCE_FORM = 'EDIT_TRANSCODER_RESOURCE_FORM';
const EDIT_LICENSE_FORM = 'EDIT_LICENSE_FORM';
const EDIT_CONFIGURATIONPROPERTIES_FORM = 'EDIT_CONFIGURATIONPROPERTIES_FORM';

class Wizard extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onSkip = this.onSkip.bind(this);
    this.onBack = this.onBack.bind(this);
    this.onSubmitSuccess = this.onSubmitSuccess.bind(this);
    this.onSubmitFail = this.onSubmitFail.bind(this);
    this.onRefreshVersion = this.onRefreshVersion.bind(this);
    this.onRefreshConfigurationProperties = this.onRefreshConfigurationProperties.bind(this);
    this.state = {
      activeStep: 0,
      stepsCompleted: [],
      versionDocument: undefined,
      configurationPropertyListDocument: undefined,
    };
  }

  componentDidMount() {
    this.onRefreshVersion();
    this.onRefreshConfigurationProperties();
    document.title = 'vidi.js | Wizard';
  }

  onRefreshVersion() {
    const { openSnackBar } = this.props;
    try {
      versionApi.getVersion()
        .then(response => this.setState({ versionDocument: response.data }));
    } catch (error) {
      const messageContent = 'Error Loading Version Information';
      openSnackBar({ messageContent, messageColor: 'secondary' });
    }
  }

  onRefreshConfigurationProperties() {
    const { openSnackBar } = this.props;
    try {
      configurationApi.getPropertiesConfiguration()
        .then(response => this.setState({ configurationPropertyListDocument: response.data }));
    } catch (error) {
      const messageContent = 'Error Getting Configuration Properties';
      openSnackBar({ messageContent, messageColor: 'secondary' });
    }
  }

  onBack() {
    if (this.state.activeStep !== 0) {
      this.setState({
        activeStep: this.state.activeStep - 1,
      });
    }
  }

  onSkip() {
    this.setState({
      activeStep: this.state.activeStep + 1,
    });
  }

  onSubmitSuccess({
    stepName,
    messageContent,
    action,
    canRetry = false,
  }) {
    const {
      openSnackBar,
    } = this.props;
    const { stepsCompleted, activeStep } = this.state;
    openSnackBar({ messageContent });
    if (!canRetry) {
      this.setState({
        activeStep: activeStep + 1,
        stepsCompleted: [stepName, ...stepsCompleted],
      });
    }
    if (action) { action(); }
  }

  onSubmitFail({
    stepName,
    messageContent,
    action,
    canRetry = false,
  }) {
    const {
      openSnackBar,
    } = this.props;
    const { stepsCompleted, activeStep } = this.state;
    openSnackBar({ messageContent, messageColor: 'secondary' });
    if (canRetry === false) {
      this.setState({
        activeStep: activeStep + 1,
        stepsCompleted: [stepName, ...stepsCompleted],
      });
    }
    if (action) { action(); }
  }


  render() {
    const {
      submitForm,
    } = this.props;
    const {
      activeStep,
      stepsCompleted,
      versionDocument,
      configurationPropertyListDocument,
    } = this.state;

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
    return (
      <Stepper activeStep={activeStep} orientation="vertical">
        <Step>
          <StepLabel>Set Admin Password</StepLabel>
          <StepContent>
            <UserPasswordForm
              userName="admin"
              onSubmit={userFormActions.onUpdatePassword}
              initialValues={{ passwordType: 'raw' }}
              onSubmitFail={() => this.onSubmitFail({ stepName: EDIT_USER_PASSWORD_FORM, messageContent: 'Error Changing Password', canRetry: true })}
              onSubmitSuccess={() => this.onSubmitSuccess({ stepName: EDIT_USER_PASSWORD_FORM, messageContent: 'Password Changed' })}
              form={EDIT_USER_PASSWORD_FORM}
            />

            <ExpansionPanelActions>
              <Button
                onClick={this.onSkip}
              >
                Skip
              </Button>
              { stepsCompleted.includes(EDIT_USER_PASSWORD_FORM) ?
                <Typography variant="caption">
                  Step completed
                </Typography> :
                <Button
                  variant="raised"
                  color="primary"
                  onClick={() => submitForm(EDIT_USER_PASSWORD_FORM)}
                >
                  Save
                </Button>
              }
            </ExpansionPanelActions>
          </StepContent>
        </Step>
        <Step>
          <StepLabel>Upload License</StepLabel>
          <StepContent>
            {versionDocument &&
            <VersionLicenseInfoDisplay
              versionDocument={
                update(versionDocument, { licenseInfo: { $unset: ['codecStatus'] } })
              }
            />
            }
            <LicenseForm
              form={EDIT_LICENSE_FORM}
              onSubmit={licenseFormActions.onUpdate}
              onSubmitSuccess={() => this.onSubmitSuccess({ stepName: EDIT_LICENSE_FORM, messageContent: 'License Updated' })}
              onSubmitFail={() => this.onSubmitFail({ stepName: EDIT_LICENSE_FORM, messageContent: 'Error Updating License', canRetry: true })}
            />
            <ExpansionPanelActions>
              <Button onClick={this.onBack}>
                Back
              </Button>
              <Button
                onClick={this.onSkip}
              >
                Skip
              </Button>
              { stepsCompleted.includes(EDIT_LICENSE_FORM) ?
                <Typography variant="caption">
                  Step completed
                </Typography> :
                <Button
                  variant="raised"
                  color="primary"
                  onClick={() => submitForm(EDIT_LICENSE_FORM)}
                >
                  Upload
                </Button>
              }
            </ExpansionPanelActions>
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
              onSubmitSuccess={() => this.onSubmitSuccess({ stepName: EDIT_STORAGE_DETAILS_FORM, messageContent: 'Storage Added' })}
              onSubmitFail={() => this.onSubmitFail({ stepName: EDIT_STORAGE_DETAILS_FORM, messageContent: 'Error Adding Storage' })}
            />
            <StorageMethodListForm
              form={EDIT_STORAGE_DETAILS_FORM}
              onSubmit={storageFormActions.onCreate}
              initialValues={storageInitialValues}
              showMethod
              onSubmitSuccess={() => this.onSubmitSuccess({ stepName: EDIT_STORAGE_DETAILS_FORM, messageContent: 'Storage Added' })}
              onSubmitFail={() => this.onSubmitFail({ stepName: EDIT_STORAGE_DETAILS_FORM, messageContent: 'Error Adding Storage' })}
            />
            <ExpansionPanelActions>
              <Button onClick={this.onBack}>
                Back
              </Button>
              <Button
                onClick={this.onSkip}
              >
                Skip
              </Button>
              { stepsCompleted.includes(EDIT_STORAGE_DETAILS_FORM) ?
                <Typography variant="caption">
                  Step completed
                </Typography> :
                <Button
                  variant="raised"
                  color="primary"
                  onClick={() => submitForm(EDIT_STORAGE_DETAILS_FORM)}
                >
                  Save
                </Button>
              }
            </ExpansionPanelActions>
          </StepContent>
        </Step>
        <Step>
          <StepLabel>Add Transcoder</StepLabel>
          <StepContent>
            <ResourceForm
              form={EDIT_TRANSCODER_RESOURCE_FORM}
              resourceType="transcoder"
              onSubmit={resourceFormActions.onCreate}
              onSubmitSuccess={() => this.onSubmitSuccess({ stepName: EDIT_TRANSCODER_RESOURCE_FORM, messageContent: 'Transcoder Added' })}
              onSubmitFail={() => this.onSubmitFail({ stepName: EDIT_TRANSCODER_RESOURCE_FORM, messageContent: 'Error Adding Transcoder' })}
            />
            <ExpansionPanelActions>
              <Button onClick={this.onBack}>
                Back
              </Button>
              <Button
                onClick={this.onSkip}
              >
                Skip
              </Button>
              { stepsCompleted.includes(EDIT_TRANSCODER_RESOURCE_FORM) ?
                <Typography variant="caption">
                  Step completed
                </Typography> :
                <Button
                  variant="raised"
                  color="primary"
                  onClick={() => submitForm(EDIT_TRANSCODER_RESOURCE_FORM)}
                >
                  Save
                </Button>
              }
            </ExpansionPanelActions>
          </StepContent>
        </Step>
        <Step>
          <StepLabel>Add Thumbnail Store</StepLabel>
          <StepContent>
            <ResourceForm
              form={EDIT_THUMBNAIL_RESOURCE_FORM}
              resourceType="thumbnail"
              onSubmit={resourceFormActions.onCreate}
              onSubmitSuccess={() => this.onSubmitSuccess({ stepName: EDIT_THUMBNAIL_RESOURCE_FORM, messageContent: 'Transcoder Added' })}
              onSubmitFail={() => this.onSubmitFail({ stepName: EDIT_THUMBNAIL_RESOURCE_FORM, messageContent: 'Error Adding Transcoder' })}
            />
            <ExpansionPanelActions>
              <Button onClick={this.onBack}>
                Back
              </Button>
              <Button
                onClick={this.onSkip}
              >
                Skip
              </Button>
              { stepsCompleted.includes(EDIT_THUMBNAIL_RESOURCE_FORM) ?
                <Typography variant="caption">
                  Step completed
                </Typography> :
                <Button
                  variant="raised"
                  color="primary"
                  onClick={() => submitForm(EDIT_THUMBNAIL_RESOURCE_FORM)}
                >
                  Save
                </Button>
              }
            </ExpansionPanelActions>
          </StepContent>
        </Step>
        <Step>
          <StepLabel>Add Configuration Properties</StepLabel>
          <StepContent>
            <PropertiesEditor
              configurationPropertyListDocument={configurationPropertyListDocument}
              onRefresh={this.onRefreshConfigurationProperties}
            />
            <ExpansionPanelActions>
              <Button onClick={this.onBack}>
                Back
              </Button>
              <Button
                onClick={this.onSkip}
              >
                Skip
              </Button>
              { stepsCompleted.includes(EDIT_CONFIGURATIONPROPERTIES_FORM) ?
                <Typography variant="caption">
                  Step completed
                </Typography> :
                <Button
                  variant="raised"
                  color="primary"
                  onClick={this.onSkip}
                >
                  Next
                </Button>
              }
            </ExpansionPanelActions>
          </StepContent>
        </Step>
        <Step>
          <StepLabel>Add Preset Shape Tags</StepLabel>
          <StepContent>
            <ShapeTagPresetForm
              onSubmit={shapetagFormActions.onCreatePreset}
              onSubmitSuccess={() => this.onSubmitSuccess({ stepName: EDIT_SHAPETAG_PRESET_FORM, messageContent: 'Shape Tags Created' })}
              onSubmitFail={() => this.onSubmitFail({ stepName: EDIT_SHAPETAG_PRESET_FORM, messageContent: 'Error Creating Shape Tags' })}
            />
            <ExpansionPanelActions>
              <Button onClick={this.onBack}>
                Back
              </Button>
              <Button
                onClick={this.onSkip}
              >
                Skip
              </Button>
              { stepsCompleted.includes(EDIT_SHAPETAG_PRESET_FORM) ?
                <Typography variant="caption">
                  Step completed
                </Typography> :
                <Button
                  variant="raised"
                  color="primary"
                  onClick={() => submitForm(EDIT_SHAPETAG_PRESET_FORM)}
                >
                  Save
                </Button>
              }
            </ExpansionPanelActions>
          </StepContent>
        </Step>
        <Step>
          <StepLabel>Complete</StepLabel>
          <StepContent>
            All steps complete.
            <ExpansionPanelActions>
              <Button onClick={this.onBack}>
                Back
              </Button>
              <Button
                component={Link}
                to="/selftest"
                variant="raised"
                color="primary"
              >
                Self Test
              </Button>
            </ExpansionPanelActions>
          </StepContent>
        </Step>
      </Stepper>
    );
  }
}

function mapStateToProps(state) {
  const { ui: { modalName } } = state;
  return {
    modalName,
  };
}

const mapDispatchToProps = {
  openSnackBar: actions.ui.openSnackBar,
  closeModal: actions.ui.closeModal,
  openModal: actions.ui.openModal,
  submitForm: submit,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wizard);
