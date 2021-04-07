import React from 'react';

const withTabs = (initialTab) => (WrappedComponent) => class extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onChangeTab = this.onChangeTab.bind(this);
    const query = new URLSearchParams(props.location.search);
    const tabValue = query.get('tab');
    this.state = {
      tabValue: tabValue || initialTab,
    };
  }

  onChangeTab(event, value) {
    const { history } = this.props;
    history.push({ search: `?tab=${value}` });
    this.setState({ tabValue: value });
  }

  render() {
    const { tabValue } = this.state;
    return (
      <WrappedComponent
        {...this.props}
        tabValue={tabValue}
        onChangeTab={this.onChangeTab}
      />
    );
  }
};

export default withTabs;
