import { compose } from 'redux';
import { withModalNoRouter } from './withModal';
import { withSnackbarNoRouter } from './withSnackbar';
import { withRouterProps } from './withRouterProps';


export default compose(withModalNoRouter, withSnackbarNoRouter, withRouterProps);
