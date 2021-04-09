import React from 'react';
import AsyncCreatableSelect from 'react-select/async-creatable';
import Async from 'react-select/async';
import Select from 'react-select';
import { change } from 'redux-form';
import Typography from '@material-ui/core/Typography';
import { useTheme, withTheme } from '@material-ui/core/styles';

import { fontFamily } from './Theme';

const stylesOverride = {
  container: (base, state) => ({
    ...base,
    color: state.isDisabled ? state.selectProps.palette.text.disabled : 'inherit',
    fontFamily,
  }),
  control: (base, state) => ({
    ...base,
    backgroundColor: state.selectProps.palette.selected,
    borderRadius: '0',
    borderWidth: state.selectProps.variant === 'outlined' ? '1px 1px 1px 1px' : '0 0 1px 0',
    boxShadow: 'none',
    borderColor: state.selectProps.palette.divider,
    color: state.isDisabled ? state.selectProps.palette.text.disabled : 'inherit',
    marginTop: (!state.hasValue) && '6px',
    fontFamily,
  }),
  dropdownIndicator: (base) => ({
    ...base,
    padding: '2px',
  }),
  indicatorsContainer: (base, state) => ({
    ...base,
    color: 'inherit',
    visibility: state.isDisabled ? 'hidden' : undefined,
  }),
  indicatorSeparator: (base) => ({
    ...base,
    background: 'inherit',
  }),
  input: (base, state) => ({
    ...base,
    color: state.isDisabled ? state.selectProps.palette.text.disabled : 'inherit',
    visibility: state.isDisabled ? 'visible' : undefined,
    fontFamily,
  }),
  menu: (base, state) => ({
    ...base,
    backgroundColor: state.selectProps.palette.background.paper,
    borderRadius: '0px',
    zIndex: 1500,
    fontFamily,
  }),
  multiValueLabel: (base) => ({
    ...base,
    fontFamily,
  }),
  option: (base, state) => ({
    ...base,
    color: state.selectProps.palette.text.primary,
    backgroundColor: state.isFocused // eslint-disable-line no-nested-ternary
      ? state.selectProps.palette.action.focus
      : state.isSelected
        ? state.selectProps.palette.action.focus.selected
        : state.selectProps.palette.action.focus.hover,
  }),
  placeholder: (base) => ({
    ...base,
    fontFamily,
    fontSize: '16px',
    lineHeight: 1,
  }),
  singleValue: (base) => ({
    ...base,
    color: 'inherit',
    fontFamily,
  }),
  valueContainer: (base) => ({
    ...base,
    fontFamily,
  }),
};

export default function WrappedAsyncSelect({
  input,
  meta,
  ...props
}) {
  const { palette } = useTheme();
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
      getOptionLabel={(option) => option[optionLabelKey]}
      getOptionValue={(option) => option[optionValueKey]}
      value={value ? value[optionValueKey] : ''}
      palette={palette}
      theme={(selectTheme) => ({
        ...selectTheme,
        borderRadius: 0,
        spacing: {
          ...selectTheme.spacing,
          menuGutter: 0,
        },
        colors: {
          ...selectTheme.colors,
          primary: palette.text.primary,
        },
      })}
    />
  );
}

class UnThemedStatefulAsyncSelec extends React.Component {
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
      valueOption = valueList.map((v) => ({ [optionLabelKey]: v, [optionValueKey]: v }));
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
          value = valueOption.map((v) => v[optionValueKey]);
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
      theme,
      ...props
    } = this.props;
    const { palette } = theme;
    const {
      optionLabelKey = 'label',
      optionValueKey = 'value',
      creatable = false,
      getOptionLabel = (option) => option[optionLabelKey],
      getOptionValue = (option) => option[optionValueKey],
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
      <>
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
          palette={palette}
          theme={(selectTheme) => ({
            ...selectTheme,
            borderRadius: 0,
            spacing: {
              ...selectTheme.spacing,
              menuGutter: 0,
            },
            colors: {
              ...selectTheme.colors,
              primary: theme.palette.text.primary,
            },
          })}
        />
      </>
    );
  }
}

export const StatefulAsyncSelect = withTheme(UnThemedStatefulAsyncSelec);

export function WrappedSelect({
  input,
  meta,
  ...props
}) {
  const { palette } = useTheme();
  return (
    <Select
      {...input}
      {...props}
      palette={palette}
      styles={stylesOverride}
      placeholder={props.label}
      theme={(selectTheme) => ({
        ...selectTheme,
        borderRadius: 0,
        spacing: {
          ...selectTheme.spacing,
          menuGutter: 0,
        },
        colors: {
          ...selectTheme.colors,
          primary: palette.text.primary,
        },
      })}
    />
  );
}
