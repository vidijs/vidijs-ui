import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

function mapStateToProps(state, ownProps) {
  const { match = {} } = ownProps;
  const { params = {} } = match;
  return {
    ...params,
  };
}

export const withRouterProps = (WrappedComponent) => connect(
  mapStateToProps,
  null,
)(withRouter(WrappedComponent));

export default withRouterProps;
