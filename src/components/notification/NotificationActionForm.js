import React from 'react';
import { reduxForm, Field, FormSection, FieldArray } from 'redux-form';
import MenuItem from '@material-ui/core/MenuItem';
import { TextField } from '../form';
import Typography from '@material-ui/core/Typography';
import update from 'immutability-helper';

import CodeField from '../ui/CodeField';
import StatefulSelect from '../ui/StatefulSelect';
import SimpleMetadataField from '../ui/SimpleMetadataField';
import { getActionType } from './NotificationAction';

function ActionTypeBase() {
  return (
    <React.Fragment>
      <Field
        name="retry"
        label="Retry"
        component={TextField}
        fullWidth
        required
      />
      <Field
        name="synchronous"
        label="Synchronous"
        component={TextField}
        fullWidth
      />
      <Field
        name="extradata"
        label="Extra Data"
        component={TextField}
        fullWidth
      />
      <Field
        name="group"
        label="Group"
        component={TextField}
        fullWidth
      />
    </React.Fragment>
  );
}

function ActionTypeHttp() {
  return (
    <React.Fragment>
      <Field
        name="url"
        label="URL"
        component={TextField}
        fullWidth
      />
      <Field
        name="contentType"
        label="Content Type"
        component={TextField}
        fullWidth
      />
      <Field
        name="method"
        label="Method"
        component={TextField}
        fullWidth
      />
      <Field
        name="timeout"
        label="Timeout"
        component={TextField}
        fullWidth
        required
      />
      <ActionTypeBase />
    </React.Fragment>
  );
}

function ActionTypeEjb() {
  return (
    <React.Fragment>
      <Field
        name="bean"
        label="Bean"
        component={TextField}
        fullWidth
      />
      <Field
        name="method"
        label="Method"
        component={TextField}
        fullWidth
      />
      <FieldArray
        name="data"
        component={SimpleMetadataField}
        label="Data"
        buttonLabel="Add Data"
      />
      <ActionTypeBase />
    </React.Fragment>
  );
}

function ActionTypeJms() {
  return (
    <React.Fragment>
      <Field
        name="Queue"
        label="Queue"
        component={TextField}
        fullWidth
      />
      <Field
        name="queueFactory"
        label="Queue Factory"
        component={TextField}
        fullWidth
      />
      <Field
        name="contentType"
        label="Content Type"
        component={TextField}
        fullWidth
      />
      <Field
        name="username"
        label="Username"
        component={TextField}
        fullWidth
      />
      <Field
        name="password"
        label="Password"
        component={TextField}
        fullWidth
      />
      <ActionTypeBase />
    </React.Fragment>
  );
}

function ActionTypeSqs() {
  return (
    <React.Fragment>
      <Field
        name="queue"
        label="Queue"
        component={TextField}
        fullWidth
      />
      <Field
        name="endpoint"
        label="Endpoint"
        component={TextField}
        fullWidth
      />
      <Field
        name="contentType"
        label="Content Type"
        component={TextField}
        fullWidth
      />
      <Field
        name="accessKey"
        label="Access Key"
        component={TextField}
        fullWidth
      />
      <Field
        name="secret"
        label="Secret Key"
        component={TextField}
        fullWidth
      />
      <ActionTypeBase />
    </React.Fragment>
  );
}

function ActionTypeJavascript() {
  return (
    <React.Fragment>
      <Field
        name="script"
        component={CodeField}
        options={{
          theme: 'material',
          mode: 'application/json',
          lineWrapping: true,
          lineNumbers: true,
        }}
      />
      <ActionTypeBase />
    </React.Fragment>
  );
}

function ActionTypeSelect(props) {
  const { initialValues = {}, valueSelector, dirty } = props;
  let initialActionType;
  if (dirty) {
    const action = valueSelector('notificationDocument.action');
    initialActionType = getActionType(action);
  } else {
    const { notificationDocument = {} } = initialValues;
    const { action = {} } = notificationDocument;
    initialActionType = getActionType(action);
  }

  const TriggerComponent = (value) => {
    switch (value) {
      case 'http':
        return (
          <FormSection name="http" component={ActionTypeHttp} {...props} />
        );
      case 'ejb':
        return (
          <FormSection name="ejb" component={ActionTypeEjb} {...props} />
        );
      case 'jms':
        return (
          <FormSection name="jms" component={ActionTypeJms} {...props} />
        );
      case 'sqs':
        return (
          <FormSection name="sqs" component={ActionTypeSqs} {...props} />
        );
      case 'javascript':
        return (
          <FormSection name="javascript" component={ActionTypeJavascript} {...props} />
        );
      default:
        return null;
    }
  };
  const onChange = (event, newValue, previousValue, name) => {
    const prevState = valueSelector(name);
    if (prevState) {
      const newState = update(prevState, {
        [newValue]: {
          $set: {},
        },
        $unset: [previousValue],
      });
      props.change(name, newState);
    } else {
      props.change(name, {});
    }
  };
  return (
    <React.Fragment>
      <StatefulSelect
        label="Action Type"
        initialvalue={initialActionType}
        fullWidth
        onChange={onChange}
        ValueComponent={TriggerComponent}
        name="notificationDocument.action"
      >
        <MenuItem value="http">HTTP</MenuItem>
        <MenuItem value="ejb">EJB</MenuItem>
        <MenuItem value="jms">JMS</MenuItem>
        <MenuItem value="sqs">SQS</MenuItem>
        <MenuItem value="javascript">Javascript</MenuItem>
      </StatefulSelect>
    </React.Fragment>
  );
}


function NotificationActionForm(props) {
  return (
    <form onSubmit={props.handleSubmit} >
      {props.error && <Typography color="error">{props.error}</Typography>}
      <FormSection
        {...props}
        name="notificationDocument.action"
        component={ActionTypeSelect}
      />
      <button type="submit" hidden />
    </form>
  );
}


export default reduxForm()(NotificationActionForm);
