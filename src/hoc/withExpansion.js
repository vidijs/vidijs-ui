import React from 'react';

const withExpansion = (WrappedComponent) => class extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onChangeExpansion = this.onChangeExpansion.bind(this);
    const { defaultExpanded = false } = props;
    this.state = {
      expanded: defaultExpanded,
    };
  }

  onChangeExpansion(event, expanded) {
    this.setState({ expanded });
  }

  render() {
    const { expanded } = this.state;
    return (
      <WrappedComponent
        onChangeExpansion={this.onChangeExpansion}
        expanded={expanded}
        {...this.props}
      />
    );
  }
};

export default withExpansion;
