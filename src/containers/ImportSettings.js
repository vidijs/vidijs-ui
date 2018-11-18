import React from 'react';
import { connect } from 'react-redux';

import ImportSettingsTitle from '../components/importsettings/ImportSettingsTitle';
import ImportSettingsCard from '../components/importsettings/ImportSettingsCard';
import ImportSettingsRemove from '../components/importsettings/ImportSettingsRemove';
import CodeModal from '../components/ui/CodeModal';

import * as actions from '../actions';
import { importsettings as api } from '@vidijs/vidijs-api';

const IMPORTSETTINGS_CODE_MODAL = 'IMPORTSETTINGS_CODE_MODAL';
const IMPORTSETTINGS_REMOVE_MODAL = 'IMPORTSETTINGS_REMOVE_MODAL';

class ImportSettings extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.onRemove = this.onRemove.bind(this);
    this.state = {
      importSettingsDocument: undefined,
    };
  }

  componentDidMount() {
    const { settingsId } = this.props;
    document.title = `vidi.js | Import Settings | ${settingsId}`;
    this.onRefresh();
  }

  onRefresh() {
    const { openSnackBar, settingsId } = this.props;
    api.getImportSettings({ settingsId })
      .then(response => response.json())
      .then(importSettingsDocument => this.setState({ importSettingsDocument }))
      .catch(() => {
        const messageContent = 'Error Loading Import Settings';
        openSnackBar({ messageContent, messageColor: 'secondary' });
      });
  }

  onRemove({ settingsId }) {
    const {
      openSnackBar,
      history,
      closeModal,
    } = this.props;
    try {
      api.removeImportSettings({ settingsId })
        .then(() => {
          const messageContent = `Import Settings ${settingsId} Removed`;
          openSnackBar({ messageContent });
          history.push('/import/settings/');
          closeModal();
        });
    } catch (error) {
      const messageContent = 'Error Removing Import Settings';
      openSnackBar({ messageContent, messageColor: 'secondary' });
    }
  }

  render() {
    const {
      modalName,
      closeModal,
      openModal,
      settingsId,
    } = this.props;
    const {
      importSettingsDocument,
    } = this.state;
    return (
      <React.Fragment>
        <ImportSettingsTitle
          settingsId={settingsId}
          openCode={() => openModal({ modalName: IMPORTSETTINGS_CODE_MODAL })}
          openRemove={() => openModal({ modalName: IMPORTSETTINGS_REMOVE_MODAL })}
          onRefresh={this.onRefresh}
        />
        {importSettingsDocument &&
          <ImportSettingsCard
            settingsId={settingsId}
            importSettingsDocument={importSettingsDocument}
            onRefresh={this.onRefresh}
          />
        }
        <CodeModal
          isOpen={(modalName === IMPORTSETTINGS_CODE_MODAL)}
          toggleDialogue={closeModal}
          code={importSettingsDocument}
          title="ImportSettingsDocument"
        />
        <ImportSettingsRemove
          isOpen={(modalName === IMPORTSETTINGS_REMOVE_MODAL)}
          closeModal={closeModal}
          onRemove={this.onRemove}
          settingsId={settingsId}
        />
      </React.Fragment>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const { settingsId } = ownProps.match.params;
  const { ui: { modalName } } = state;
  return {
    settingsId,
    modalName,
  };
}

const mapDispatchToProps = {
  openSnackBar: actions.ui.openSnackBar,
  closeModal: actions.ui.closeModal,
  openModal: actions.ui.openModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(ImportSettings);
