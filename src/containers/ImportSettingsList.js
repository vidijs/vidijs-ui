import React from 'react';
import { connect } from 'react-redux';

import ImportSettingsListTitle from '../components/importsettings/ImportSettingsListTitle';
import ImportSettingsListCard from '../components/importsettings/ImportSettingsListCard';
import ImportSettingsDialog from '../components/importsettings/ImportSettingsDialog';
import CodeModal from '../components/ui/CodeModal';

import * as actions from '../actions';
import { importsettings as api } from '@vidijs/vidijs-api';

const IMPORTSETTINGSLIST_CODE_MODAL = 'IMPORTSETTINGSLIST_CODE_MODAL';
const IMPORTSETTINGS_CREATE_MODAL = 'IMPORTSETTINGS_CREATE_MODAL';

class ImportSettingsList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.state = {
      uriListDocument: undefined,
    };
  }

  componentDidMount() {
    document.title = 'vidi.js | Import Settings';
    this.onRefresh();
  }

  onRefresh() {
    const { openSnackBar } = this.props;
    try {
      api.listImportSettings()
        .then(response => response.json())
        .then(uriListDocument => this.setState({ uriListDocument }));
    } catch (error) {
      const messageContent = 'Error Loading Import Settings';
      openSnackBar({ messageContent, messageColor: 'secondary' });
    }
  }

  render() {
    const {
      modalName,
      closeModal,
      openModal,
      history,
    } = this.props;
    const {
      uriListDocument,
    } = this.state;
    return (
      <React.Fragment>
        <ImportSettingsListTitle
          openCode={() => openModal({ modalName: IMPORTSETTINGSLIST_CODE_MODAL })}
          openCreate={() => openModal({ modalName: IMPORTSETTINGS_CREATE_MODAL })}
          onRefresh={this.onRefresh}
        />
        {uriListDocument &&
          <ImportSettingsListCard
            uriListDocument={uriListDocument}
          />
        }
        <CodeModal
          isOpen={(modalName === IMPORTSETTINGSLIST_CODE_MODAL)}
          toggleDialogue={closeModal}
          code={uriListDocument}
          title="URIListDocument"
        />
        <ImportSettingsDialog
          isOpen={(modalName === IMPORTSETTINGS_CREATE_MODAL)}
          closeModal={closeModal}
          history={history}
        />
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  const { ui: { modalName } } = state;
  return {
    modalName,
  };
}

const mapDispatchToProps = {
  openSnackBar: actions.ui.openSnackBar,
  closeModal: actions.ui.closeModal,
  openModal: actions.ui.openModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(ImportSettingsList);
