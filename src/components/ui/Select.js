import React from 'react';
import AsyncCreatableSelect from 'react-select/lib/AsyncCreatable';
import Async from 'react-select/lib/Async';
import Select from 'react-select';
import { change } from 'redux-form';
import Typography from '@material-ui/core/Typography';

// https://gist.github.com/leocristofani/98312e61807db8f32e720c9f97a186e5


const stylesOverride = {
  clearIndicator: base => ({
    ...base,
  }),
  container: (base, state) => ({
    ...base,
    color: state.isDisabled ? 'rgba(0, 0, 0, 0.54)' : 'inherit',
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
  }),
  control: (base, state) => ({
    ...base,
    background: 'inherit',
    borderRadius: '0',
    borderWidth: '0 0 1px 0',
    boxShadow: 'none',
    borderColor: 'rgba(0, 0, 0, 0.42)',
    color: state.isDisabled ? 'rgba(0, 0, 0, 0.54)' : 'rgba(0, 0, 0, 0.87)',
    marginTop: (!state.hasValue) && '6px',
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
  }),
  dropdownIndicator: base => ({
    ...base,
    padding: '2px',
  }),
  group: base => ({
    ...base,
  }),
  groupHeading: base => ({
    ...base,
  }),
  indicatorsContainer: base => ({
    ...base,
  }),
  indicatorSeparator: base => ({
    ...base,
    background: 'inherit',
  }),
  input: (base, state) => ({
    ...base,
    color: state.isDisabled ? 'rgba(0, 0, 0, 0.54)' : 'inherit',
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
  }),
  loadingIndicator: base => ({
    ...base,
  }),
  loadingMessage: base => ({
    ...base,
  }),
  menu: base => ({
    ...base,
    borderRadius: '0px',
    zIndex: 1500,
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
  }),
  menuList: base => ({
    ...base,
  }),
  menuPortal: base => ({
    ...base,
  }),
  multiValue: base => ({
    ...base,
  }),
  multiValueLabel: base => ({
    ...base,
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
  }),
  multiValueRemove: base => ({
    ...base,
  }),
  noOptionsMessage: base => ({
    ...base,
  }),
  option: (base, state) => ({
    ...base,
    color: 'rgba(0, 0, 0, 0.87)',
    backgroundColor: state.isFocused // eslint-disable-line no-nested-ternary
      ? 'rgba(0, 0, 0, 0.08)'
      : state.isSelected
        ? 'rgba(0, 0, 0, 0.14)'
        : 'inherit',
  }),
  placeholder: base => ({
    ...base,
    marginLeft: '0px',
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    fontSize: '16px',
    lineHeight: 1,
    padding: 0,
  }),
  singleValue: base => ({
    ...base,
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
  }),
  valueContainer: base => ({
    ...base,
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    padding: '2px 0px 2px 0px',
  }),
};

export default function WrappedAsyncSelect({
  input,
  meta,
  ...props
}) {
  const { value } = input;
  const {
    optionLabelKey = 'label',
    optionValueKey = 'value',
    creatable = true,
  } = props;
  const AsyncSelect = creatable ? AsyncCreatableSelect : Async;
  const parse = (v) => {
    if (v) {
      return v.value;
    }
    return undefined;
  };
  return (
    <AsyncSelect
      {...input}
      {...props}
      parse={parse}
      styles={stylesOverride}
      placeholder={props.label}
      getOptionLabel={option => option[optionLabelKey]}
      getOptionValue={option => option[optionValueKey]}
      value={value ? value[optionValueKey] : ''}
    />
  );
}

export class StatefulAsyncSelect extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    const { input: { value } } = this.props;
    const {
      optionLabelKey = 'label',
      optionValueKey = 'value',
      isMulti,
    } = props;
    let valueOption;
    let inputValue;
    if (isMulti && value) {
      let valueList = value;
      if (!Array.isArray(value)) {
        valueList = value.split(',');
      }
      valueOption = valueList.map(v => ({ [optionLabelKey]: v, [optionValueKey]: v }));
    } else {
      valueOption = value && { [optionLabelKey]: value, [optionValueKey]: value };
      inputValue = value;
    }
    this.state = {
      inputValue,
      valueOption,
    };
  }

  handleUpdate(inputValue) {
    this.setState({ inputValue });
  }

  handleChange(valueOption) {
    const {
      input: { name, onChange },
      meta: { dispatch, form },
      optionValueKey = 'value',
      isMulti,
    } = this.props;
    let value = '';
    if (valueOption) {
      if (isMulti) {
        if (valueOption.length > 0) {
          value = valueOption.map(v => v[optionValueKey]);
        } else {
          value = [];
          this.handleInputChange([]); // fire when clearing value
        }
      } else {
        value = valueOption[optionValueKey];
      }
    } else {
      this.handleInputChange(value); // fire when clearing value
    }
    this.setState({ valueOption });
    // console.log('handleChange: value', value)
    onChange(value);
    if (dispatch) { // Prefer dispatch as more reliable
      dispatch(change(form, name, value));
    } else {
      onChange(value);
    }
  }

  handleInputChange(inputValue) {
    if (this.props.isMulti) {
      if (inputValue.length === 0) {
        this.setState({ inputValue: undefined }); // errors if set to empty array
        return;
      }
    }
    this.setState({ inputValue });
  }

  render() {
    const {
      input,
      meta,
      ...props
    } = this.props;
    const {
      optionLabelKey = 'label',
      optionValueKey = 'value',
      creatable = false,
      getOptionLabel = option => option[optionLabelKey],
      getOptionValue = option => option[optionValueKey],
      loadOptions,
      disableInitial,
      isDisabled: isDisabledProp,
    } = props;
    const { valueOption, inputValue } = this.state;
    let isDisabled = isDisabledProp;
    if (disableInitial) {
      isDisabled = (meta.initial !== undefined && meta.initial !== '');
    }
    let ThisSelect = Select;
    if (loadOptions) {
      ThisSelect = creatable ? AsyncCreatableSelect : Async;
    }
    return (
      <React.Fragment>
        {valueOption && (
          <Typography variant="caption">{props.required ? `${props.label} *` : props.label}</Typography>
        )}
        <ThisSelect
          {...props}
          {...input}
          id={input.name}
          styles={stylesOverride}
          placeholder={props.required ? `${props.label} *` : props.label}
          getOptionLabel={getOptionLabel}
          getOptionValue={getOptionValue}
          value={valueOption}
          inputValue={inputValue}
          onInputChange={this.handleInputChange}
          onChange={this.handleChange}
          onBlur={() => true}
          onFocus={() => true}
          isDisabled={isDisabled}
        />
      </React.Fragment>
    );
  }
}


export function WrappedSelect({
  input,
  meta,
  ...props
}) {
  return (
    <Select
      {...input}
      {...props}
      styles={stylesOverride}
      placeholder={props.label}
    />
  );
}
