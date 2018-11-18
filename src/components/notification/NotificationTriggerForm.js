import React from 'react';
import { reduxForm, Field, FormSection } from 'redux-form';
import MenuItem from '@material-ui/core/MenuItem';
import { TextField } from 'redux-form-material-ui';
import update from 'immutability-helper';
import Typography from '@material-ui/core/Typography';

import ChipInput from '../ui/ChipInput';
import StatefulSelect from '../ui/StatefulSelect';
import { getTriggerEntity, getJobAction } from './NotificationTrigger';

function NotificationTriggerItemType(props) {
  const { initialValues = {}, valueSelector, dirty } = props;
  const name = props.id || 'notificationDocument.trigger.item';
  let initialvalue;
  if (dirty) {
    const item = valueSelector(name);
    initialvalue = item && Object.keys(item)[0];
  } else {
    const { notificationDocument = {} } = initialValues;
    const { trigger = {} } = notificationDocument;
    const { item } = trigger;
    initialvalue = item && Object.keys(item)[0];
  }
  const onChange = (event, newValue, previousValue) => {
    const prevState = valueSelector(name);
    const setValue = '';
    if (prevState) {
      const newState = update(prevState, {
        [newValue]: {
          $set: setValue,
        },
        $unset: [previousValue],
      });
      props.change(name, newState);
    } else {
      props.change(name, { [newValue]: setValue });
    }
  };
  return (
    <React.Fragment>
      <StatefulSelect
        label="Trigger Action"
        initialvalue={initialvalue}
        fullWidth
        onChange={onChange}
        name={name}
      >
        <MenuItem value="create">Create</MenuItem>
        <MenuItem value="delete">Delete</MenuItem>
      </StatefulSelect>
      <Field name="create" type="hidden" component="input" />
      <Field name="delete" type="hidden" component="input" />
    </React.Fragment>
  );
}

function NotificationTriggerStorageType(props) {
  const { initialValues = {}, valueSelector, dirty } = props;
  const name = props.id || 'notificationDocument.trigger.storage';
  let initialvalue;
  if (dirty) {
    const item = valueSelector(name);
    initialvalue = item && Object.keys(item)[0];
  } else {
    const { notificationDocument = {} } = initialValues;
    const { trigger = {} } = notificationDocument;
    const { item } = trigger;
    initialvalue = item && Object.keys(item)[0];
  }
  const onChange = (event, newValue, previousValue) => {
    const prevState = valueSelector(name);
    const setValue = '';
    if (prevState) {
      const newState = update(prevState, {
        [newValue]: {
          $set: setValue,
        },
        $unset: [previousValue],
      });
      props.change(name, newState);
    } else {
      props.change(name, { [newValue]: setValue });
    }
  };
  return (
    <React.Fragment>
      <StatefulSelect
        label="Trigger Action"
        initialvalue={initialvalue}
        fullWidth
        onChange={onChange}
        name={name}
      >
        <MenuItem value="create">Create</MenuItem>
        <MenuItem value="delete">Delete</MenuItem>
        <MenuItem value="filename">Filename</MenuItem>
      </StatefulSelect>
      <Field name="create" type="hidden" component="input" />
      <Field name="delete" type="hidden" component="input" />
      <Field name="filename" type="hidden" component="input" />
    </React.Fragment>
  );
}

function NotificationTriggerFileType(props) {
  const { initialValues = {}, valueSelector, dirty } = props;
  const name = props.id || 'notificationDocument.trigger.file';
  let initialvalue;
  if (dirty) {
    const item = valueSelector(name);
    initialvalue = item && Object.keys(item)[0];
  } else {
    const { notificationDocument = {} } = initialValues;
    const { trigger = {} } = notificationDocument;
    const { item } = trigger;
    initialvalue = item && Object.keys(item)[0];
  }
  const onChange = (event, newValue, previousValue) => {
    const prevState = valueSelector(name);
    const setValue = '';
    if (prevState) {
      const newState = update(prevState, {
        [newValue]: {
          $set: setValue,
        },
        $unset: [previousValue],
      });
      props.change(name, newState);
    } else {
      props.change(name, { [newValue]: setValue });
    }
  };
  return (
    <React.Fragment>
      <StatefulSelect
        label="Trigger Action"
        initialvalue={initialvalue}
        fullWidth
        onChange={onChange}
        name={name}
      >
        <MenuItem value="new">New</MenuItem>
        <MenuItem value="change">Change</MenuItem>
        <MenuItem value="hash">Hash</MenuItem>
        <MenuItem value="close">Close</MenuItem>
        <MenuItem value="delete">Delete</MenuItem>
      </StatefulSelect>
      <Field name="new" type="hidden" component="input" />
      <Field name="change" type="hidden" component="input" />
      <Field name="hash" type="hidden" component="input" />
      <Field name="close" type="hidden" component="input" />
      <Field name="delete" type="hidden" component="input" />
    </React.Fragment>
  );
}

function NotificationTriggerGroupType(props) {
  const { initialValues = {}, valueSelector, dirty } = props;
  const name = props.id || 'notificationDocument.trigger.group';
  let initialvalue;
  if (dirty) {
    const item = valueSelector(name);
    initialvalue = item && Object.keys(item)[0];
  } else {
    const { notificationDocument = {} } = initialValues;
    const { trigger = {} } = notificationDocument;
    const { item } = trigger;
    initialvalue = item && Object.keys(item)[0];
  }
  const onChange = (event, newValue, previousValue) => {
    const prevState = valueSelector(name);
    const setValue = '';
    if (prevState) {
      const newState = update(prevState, {
        [newValue]: {
          $set: setValue,
        },
        $unset: [previousValue],
      });
      props.change(name, newState);
    } else {
      props.change(name, { [newValue]: setValue });
    }
  };
  return (
    <React.Fragment>
      <StatefulSelect
        label="Trigger Action"
        initialvalue={initialvalue}
        fullWidth
        onChange={onChange}
        name={name}
      >
        <MenuItem value="create">Create</MenuItem>
        <MenuItem value="delete">Delete</MenuItem>
        <MenuItem value="modify">Modify</MenuItem>
      </StatefulSelect>
      <Field name="create" type="hidden" component="input" />
      <Field name="delete" type="hidden" component="input" />
      <Field name="modify" type="hidden" component="input" />
    </React.Fragment>
  );
}

function NotificationTriggerShapeType(props) {
  const { initialValues = {}, valueSelector, dirty } = props;
  const name = props.id || 'notificationDocument.trigger.shape';
  let initialvalue;
  if (dirty) {
    const item = valueSelector(name);
    initialvalue = item && Object.keys(item)[0];
  } else {
    const { notificationDocument = {} } = initialValues;
    const { trigger = {} } = notificationDocument;
    const { item } = trigger;
    initialvalue = item && Object.keys(item)[0];
  }
  const onChange = (event, newValue, previousValue) => {
    const prevState = valueSelector(name);
    const setValue = '';
    if (prevState) {
      const newState = update(prevState, {
        [newValue]: {
          $set: setValue,
        },
        $unset: [previousValue],
      });
      props.change(name, newState);
    } else {
      props.change(name, { [newValue]: setValue });
    }
  };
  return (
    <React.Fragment>
      <StatefulSelect
        label="Trigger Action"
        initialvalue={initialvalue}
        fullWidth
        onChange={onChange}
        name={name}
      >
        <MenuItem value="create">Create</MenuItem>
        <MenuItem value="delete">Delete</MenuItem>
        <MenuItem value="modify">Modify</MenuItem>
      </StatefulSelect>
      <Field name="create" type="hidden" component="input" />
      <Field name="delete" type="hidden" component="input" />
      <Field name="modify" type="hidden" component="input" />
    </React.Fragment>
  );
}

function NotificationTriggerAccessType(props) {
  const { initialValues = {}, valueSelector, dirty } = props;
  const name = props.id || 'notificationDocument.trigger.access';
  let initialvalue;
  if (dirty) {
    const item = valueSelector(name);
    initialvalue = item && Object.keys(item)[0];
  } else {
    const { notificationDocument = {} } = initialValues;
    const { trigger = {} } = notificationDocument;
    const { item } = trigger;
    initialvalue = item && Object.keys(item)[0];
  }
  const onChange = (event, newValue, previousValue) => {
    const prevState = valueSelector(name);
    const setValue = '';
    if (prevState) {
      const newState = update(prevState, {
        [newValue]: {
          $set: setValue,
        },
        $unset: [previousValue],
      });
      props.change(name, newState);
    } else {
      props.change(name, { [newValue]: setValue });
    }
  };
  return (
    <React.Fragment>
      <StatefulSelect
        label="Trigger Action"
        initialvalue={initialvalue}
        fullWidth
        onChange={onChange}
        name={name}
      >
        <MenuItem value="create">Create</MenuItem>
        <MenuItem value="delete">Delete</MenuItem>
        <MenuItem value="change">Change</MenuItem>
      </StatefulSelect>
      <Field name="create" type="hidden" component="input" />
      <Field name="delete" type="hidden" component="input" />
      <Field name="change" type="hidden" component="input" />
    </React.Fragment>
  );
}

function NotificationTriggerQuotaType(props) {
  const { initialValues = {}, valueSelector, dirty } = props;
  const name = props.id || 'notificationDocument.trigger.quota';
  let initialvalue;
  if (dirty) {
    const item = valueSelector(name);
    initialvalue = item && Object.keys(item)[0];
  } else {
    const { notificationDocument = {} } = initialValues;
    const { trigger = {} } = notificationDocument;
    const { item } = trigger;
    initialvalue = item && Object.keys(item)[0];
  }
  const onChange = (event, newValue, previousValue) => {
    const prevState = valueSelector(name);
    const setValue = '';
    if (prevState) {
      const newState = update(prevState, {
        [newValue]: {
          $set: setValue,
        },
        $unset: [previousValue],
      });
      props.change(name, newState);
    } else {
      props.change(name, { [newValue]: setValue });
    }
  };
  return (
    <React.Fragment>
      <StatefulSelect
        label="Trigger Action"
        initialvalue={initialvalue}
        fullWidth
        onChange={onChange}
        name={name}
      >
        <MenuItem value="create">Create</MenuItem>
        <MenuItem value="delete">Delete</MenuItem>
        <MenuItem value="warning">Warning</MenuItem>
      </StatefulSelect>
      <Field name="create" type="hidden" component="input" />
      <Field name="delete" type="hidden" component="input" />
      <Field name="warning" type="hidden" component="input" />
    </React.Fragment>
  );
}

function NotificationTriggerDocumentType(props) {
  const { initialValues = {}, valueSelector, dirty } = props;
  const name = props.id || 'notificationDocument.trigger.document';
  let initialvalue;
  if (dirty) {
    const item = valueSelector(name);
    initialvalue = item && Object.keys(item)[0];
  } else {
    const { notificationDocument = {} } = initialValues;
    const { trigger = {} } = notificationDocument;
    const { item } = trigger;
    initialvalue = item && Object.keys(item)[0];
  }
  const onChange = (event, newValue, previousValue) => {
    const prevState = valueSelector(name);
    const setValue = '';
    if (prevState) {
      const newState = update(prevState, {
        [newValue]: {
          $set: setValue,
        },
        $unset: [previousValue],
      });
      props.change(name, newState);
    } else {
      props.change(name, { [newValue]: setValue });
    }
  };
  return (
    <React.Fragment>
      <StatefulSelect
        label="Trigger Action"
        initialvalue={initialvalue}
        fullWidth
        onChange={onChange}
        name={name}
      >
        <MenuItem value="create">Create</MenuItem>
        <MenuItem value="delete">Delete</MenuItem>
      </StatefulSelect>
      <Field name="create" type="hidden" component="input" />
      <Field name="delete" type="hidden" component="input" />
    </React.Fragment>
  );
}


function NotificationTriggerMetadataModifyType() {
  return (
    <React.Fragment>
      <Field
        name="field"
        component={TextField}
        label="Field"
        fullWidth
      />
      <Field
        name="language"
        component={TextField}
        label="Language"
        fullWidth
      />
      <Field
        name="track"
        component={TextField}
        label="Track"
        fullWidth
      />
      <Field
        name="vinterval"
        component={TextField}
        label="Interval"
        fullWidth
      />
    </React.Fragment>
  );
}


function NotificationTriggerMetadataType(props) {
  const { initialValues = {}, valueSelector, dirty } = props;
  const name = props.id || 'notificationDocument.trigger.metadata';
  let initialvalue;
  if (dirty) {
    const metadata = valueSelector(name);
    initialvalue = metadata && Object.keys(metadata)[0];
  } else {
    try {
      const metadata = initialValues[props.id];
      initialvalue = metadata && Object.keys(metadata)[0];
    } catch (error) { console.log(error); }
  }
  const onChange = (event, newValue, previousValue) => {
    const prevState = valueSelector(name);
    const setValue = {};
    if (prevState) {
      const newState = update(prevState, {
        [newValue]: {
          $set: setValue,
        },
        $unset: [previousValue],
      });
      props.change(name, newState);
    } else {
      props.change(name, { [newValue]: setValue });
    }
  };
  const ValueComponent = (value) => {
    switch (value) {
      case 'modify':
        return (
          <FormSection
            name="modify"
            component={NotificationTriggerMetadataModifyType}
            {...props}
          />
        );
      default:
        return null;
    }
  };
  return (
    <React.Fragment>
      <StatefulSelect
        label="Trigger Action"
        initialvalue={initialvalue}
        fullWidth
        onChange={onChange}
        name={name}
        ValueComponent={ValueComponent}
      >
        <MenuItem value="modify">Modify</MenuItem>
      </StatefulSelect>
      <Field name="modify" type="hidden" component="input" />
    </React.Fragment>
  );
}

function NotificationTriggerCollectionType(props) {
  const { initialValues = {}, valueSelector, dirty } = props;
  const name = props.id || 'notificationDocument.trigger.collection';
  let initialvalue;
  if (dirty) {
    const item = valueSelector(name);
    initialvalue = item && Object.keys(item)[0];
  } else {
    const { notificationDocument = {} } = initialValues;
    const { trigger = {} } = notificationDocument;
    const { item } = trigger;
    initialvalue = item && Object.keys(item)[0];
  }
  const onChange = (event, newValue, previousValue) => {
    const prevState = valueSelector(name);
    const setValue = newValue === 'metadata' ? {} : '';
    if (prevState) {
      const newState = update(prevState, {
        [newValue]: {
          $set: setValue,
        },
        $unset: [previousValue],
      });
      props.change(name, newState);
    } else {
      props.change(name, { [newValue]: setValue });
    }
  };
  const ValueComponent = (value) => {
    switch (value) {
      case 'metadata':
        return (
          <FormSection
            name="metadata"
            component={NotificationTriggerMetadataType}
            id={`${name}.metadata`}
            {...props}
          />
        );
      default:
        return null;
    }
  };
  return (
    <React.Fragment>
      <StatefulSelect
        label="Trigger Action"
        initialvalue={initialvalue}
        fullWidth
        onChange={onChange}
        name={name}
        ValueComponent={ValueComponent}
      >
        <MenuItem value="create">Create</MenuItem>
        <MenuItem value="delete">Delete</MenuItem>
        <MenuItem value="modify">Modify</MenuItem>
        <MenuItem value="metadata">Metadata</MenuItem>
      </StatefulSelect>
      <Field name="create" type="hidden" component="input" />
      <Field name="delete" type="hidden" component="input" />
      <Field name="modify" type="hidden" component="input" />
      <Field name="metadata" type="hidden" component="input" />
    </React.Fragment>
  );
}


function NotificationJobTriggerContentFiltersType() {
  return (
    <React.Fragment>
      <Field
        name="contentFilter"
        label="Content Filter"
        component={ChipInput}
        simple
        fullWidth
      />
    </React.Fragment>
  );
}

function NotificationJobTriggerJobDataType() {
  return (
    <React.Fragment>
      <Field
        name="key"
        component={TextField}
        label="Key"
        fullWidth
      />
      <Field
        name="value"
        component={TextField}
        label="Value"
        fullWidth
      />
      <Field
        name="key-regex"
        component={TextField}
        label="Key Regex"
        fullWidth
      />
      <Field
        name="value-regex"
        component={TextField}
        label="Value Regex"
        fullWidth
      />
    </React.Fragment>
  );
}

function NotificationJobTriggerFilterType() {
  return (
    <React.Fragment>
      <Field
        name="type"
        component={TextField}
        label="Filter Type"
        fullWidth
      />
      <Field
        name="step"
        component={TextField}
        label="Filter Step"
        type="number"
        fullWidth
      />
      <FormSection
        name="jobdata"
        component={NotificationJobTriggerJobDataType}
      />
    </React.Fragment>
  );
}

function NotificationJobTriggerType(props) {
  const { initialValues = {}, valueSelector, dirty } = props;
  const name = props.id || 'notificationDocument.trigger.job';
  let initialJobAction;
  if (dirty) {
    const job = valueSelector(name);
    initialJobAction = getJobAction(job);
  } else {
    const { notificationDocument = {} } = initialValues;
    const { trigger = {} } = notificationDocument;
    const { job } = trigger;
    initialJobAction = getJobAction(job);
  }
  const onChange = (event, newValue, previousValue) => {
    const prevState = valueSelector(name);
    const setValue = '';
    if (prevState) {
      const newState = update(prevState, {
        [newValue]: {
          $set: setValue,
        },
        $unset: [previousValue],
      });
      props.change(name, newState);
    } else {
      props.change(name, { [newValue]: setValue });
    }
  };
  return (
    <React.Fragment>
      <StatefulSelect
        label="Trigger Action"
        initialvalue={initialJobAction}
        fullWidth
        onChange={onChange}
        name={name}
      >
        <MenuItem value="create">Create</MenuItem>
        <MenuItem value="stop">Stop</MenuItem>
        <MenuItem value="finish">Finish</MenuItem>
        <MenuItem value="fail">Fail</MenuItem>
      </StatefulSelect>
      <FormSection
        name="filter"
        component={NotificationJobTriggerFilterType}
      />
      <FormSection
        name="contentFilters"
        component={NotificationJobTriggerContentFiltersType}
      />
      <Field name="fail" type="hidden" component="input" />
      <Field name="stop" type="hidden" component="input" />
      <Field name="create" type="hidden" component="input" />
      <Field name="finish" type="hidden" component="input" />
    </React.Fragment>
  );
}

function TriggerEntitySelect(props) {
  const { initialValues = {}, valueSelector, dirty } = props;
  const name = props.id || 'notificationDocument.trigger';
  let initialTriggerEntity;
  if (dirty) {
    const trigger = valueSelector(name);
    initialTriggerEntity = getTriggerEntity(trigger);
  } else {
    const { notificationDocument = {} } = initialValues;
    const { trigger = {} } = notificationDocument;
    initialTriggerEntity = getTriggerEntity(trigger);
  }

  const TriggerComponent = (value) => {
    switch (value) {
      case 'job':
        return (
          <FormSection name="job" component={NotificationJobTriggerType} {...props} />
        );
      case 'item':
        return (
          <FormSection name="item" component={NotificationTriggerItemType} {...props} />
        );
      case 'metadata':
        return (
          <FormSection name="metadata" component={NotificationTriggerMetadataType} {...props} />
        );
      case 'collection':
        return (
          <FormSection name="collection" component={NotificationTriggerCollectionType} {...props} />
        );
      case 'storage':
        return (
          <FormSection name="storage" component={NotificationTriggerStorageType} {...props} />
        );
      case 'file':
        return (
          <FormSection name="file" component={NotificationTriggerFileType} {...props} />
        );
      case 'shape':
        return (
          <FormSection name="shape" component={NotificationTriggerShapeType} {...props} />
        );
      case 'group':
        return (
          <FormSection name="group" component={NotificationTriggerGroupType} {...props} />
        );
      case 'access':
        return (
          <FormSection name="access" component={NotificationTriggerAccessType} {...props} />
        );
      case 'quota':
        return (
          <FormSection name="quota" component={NotificationTriggerQuotaType} {...props} />
        );
      case 'document':
        return (
          <FormSection name="document" component={NotificationTriggerDocumentType} {...props} />
        );
      default:
        return null;
    }
  };
  const onChange = (event, newValue, previousValue) => {
    const prevState = valueSelector(name);
    const setValue = {};
    if (prevState) {
      const newState = update(prevState, {
        [newValue]: {
          $set: setValue,
        },
        $unset: [previousValue],
      });
      props.change(name, newState);
    } else {
      props.change(name, { [newValue]: setValue });
    }
  };
  return (
    <React.Fragment>
      <StatefulSelect
        label="Trigger Entity"
        initialvalue={initialTriggerEntity}
        fullWidth
        onChange={onChange}
        ValueComponent={TriggerComponent}
        name={name}
      >
        <MenuItem value="job">Job</MenuItem>
        <MenuItem value="item">Item</MenuItem>
        <MenuItem value="metadata">Metadata</MenuItem>
        <MenuItem value="collection">Collection</MenuItem>
        <MenuItem value="storage">Storage</MenuItem>
        <MenuItem value="file">File</MenuItem>
        <MenuItem value="shape">Shape</MenuItem>
        <MenuItem value="group">Group</MenuItem>
        <MenuItem value="access">Access</MenuItem>
        <MenuItem value="quota">Quota</MenuItem>
        <MenuItem value="access">Access</MenuItem>
        <MenuItem value="document">Document</MenuItem>
      </StatefulSelect>
    </React.Fragment>
  );
}

function NotificationTriggerForm(props) {
  return (
    <form onSubmit={props.handleSubmit} >
      {props.error && <Typography color="error">{props.error}</Typography>}
      <FormSection
        {...props}
        name="notificationDocument.trigger"
        component={TriggerEntitySelect}
      />
      <button type="submit" hidden />
    </form>
  );
}

export default reduxForm()(NotificationTriggerForm);
