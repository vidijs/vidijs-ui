import React from 'react';

const withStepper = (WrappedComponent) => class extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onBack = this.onBack.bind(this);
    this.onNext = this.onNext.bind(this);
    this.state = {
      activeStep: 0,
    };
  }

  onBack() {
    const { activeStep: currentActiveStep } = this.state;
    if (currentActiveStep !== 0) {
      this.setState({
        activeStep: currentActiveStep - 1,
      });
    }
  }

  onNext() {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep + 1,
    });
  }

  render() {
    const { activeStep } = this.state;
    return (
      <WrappedComponent
        onBack={this.onBack}
        onNext={this.onNext}
        activeStep={activeStep}
        {...this.props}
      />
    );
  }
};

export default withStepper;
