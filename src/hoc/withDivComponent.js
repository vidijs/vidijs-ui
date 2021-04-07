import React from 'react';

const withDivComponent = (WrappedComponent) => (props) => <WrappedComponent {...props} component="div" />;

export default withDivComponent;
