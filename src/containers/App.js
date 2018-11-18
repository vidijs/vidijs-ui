import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'redux';

import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';

import TopAppBar from './TopAppBar';
import Main from './Main';
import FullScreenDialog from './FullScreenDialog';
import HistoryDialog from './HistoryDialog';

import withModal from '../hoc/withModal';

import '../css/CodeMirror.css';

const HISTORY_DIALOG = 'HISTORY_DIALOG';
const MAINMENU_DIALOG = 'MAINMENU_DIALOG';

const styles = {
  appFrame: {
    zIndex: 1,
    display: 'inline-block',
    minWidth: '100vw',
  },
};


function App({
  classes,
  history,
  onOpen,
}) {
  const toggleHistory = () => onOpen({ modalName: HISTORY_DIALOG });
  const toggleMainMenu = () => onOpen({ modalName: MAINMENU_DIALOG });
  return (
    <div className={classes.appFrame}>
      <FullScreenDialog
        dialogName={MAINMENU_DIALOG}
      />
      <HistoryDialog
        dialogName={HISTORY_DIALOG}
      />
      <TopAppBar
        history={history}
        toggleMainMenu={toggleMainMenu}
        toggleHistory={toggleHistory}
      />
      <Main />
    </div>
  );
}

export default compose(withModal, withStyles(styles))(App);
