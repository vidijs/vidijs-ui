import React from 'react';

const withHover = (WrappedComponent) => class extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.state = {
      isHovering: false,
    };
  }

  handleMouseOver() {
    this.setState({ isHovering: true });
  }

  handleMouseOut() {
    this.setState({ isHovering: false });
  }

  render() {
    return (
      <WrappedComponent
        onFocus={this.handleMouseOver}
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}
        onBlur={this.handleMouseOut}
        isHovering={this.state.isHovering}
        {...this.props}
      />
    );
  }
};

export default withHover;
