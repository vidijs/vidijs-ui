import React from 'react';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';

export default class StatefulSelect extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      [props.name]: props.initialvalue,
    };
  }

  handleChange(name) {
    return (event) => {
      const prevState = this.state[name];
      if (this.props.onChange) { this.props.onChange(event, event.target.value, prevState, name); }
      this.setState({
        [name]: event.target.value,
      });
    };
  }

  render() {
    const {
      children,
      ValueComponent,
      label,
      ...selectProps
    } = this.props;
    const value = this.state[this.props.name];
    const WrappedValueComponent = ValueComponent && ValueComponent(value);
    return (
      <>
        <FormHelperText>{label}</FormHelperText>
        <TextField
          {...selectProps}
          select
          value={value}
          FormHelperTextProps={{ focused: true }}
          onChange={this.handleChange(this.props.name)}
        >
          { children }
        </TextField>

        {WrappedValueComponent}
      </>
    );
  }
}
