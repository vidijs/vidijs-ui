import React from 'react';
import { connect } from 'react-redux';

import { quota as api } from '@vidispine/vdt-api';
import QuotaTitle from '../components/quota/QuotaTitle';
import QuotaRemove from '../components/quota/QuotaRemove';
import QuotaDialog from '../components/quota/QuotaDialog';
import QuotaList from '../components/quota/QuotaList';
import QuotaFilter from '../components/quota/QuotaFilter';

import CodeModal from '../components/ui/CodeModal';
import * as actions from '../actions';

const QUOTA_CODE_MODAL = 'QUOTA_CODE_MODAL';
const QUOTA_REMOVE_MODAL = 'QUOTA_REMOVE_MODAL';
const QUOTA_CREATE_MODAL = 'QUOTA_CREATE_MODAL';

class AccessControl extends React.Component {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.openRemove = this.openRemove.bind(this);
    this.onRemove = this.onRemove.bind(this);
    this.onFilter = this.onFilter.bind(this);
    this.state = {
      quotaRuleListDocument: undefined,
    };
  }

  componentDidMount() {
    this.onRefresh();
  }

  onRefresh() {
    const { openSnackBar } = this.props;
    const { queryParams } = this.state;
    api.listQuota({ queryParams })
      .then((response) => response.json())
      .then((quotaRuleListDocument) => this.setState({ quotaRuleListDocument }))
      .catch(() => {
        const messageContent = 'Error Loading Quota';
        openSnackBar({ messageContent, messageColor: 'secondary' });
      });
  }

  onFilter({ quotaRuleListDocument, queryParams }) {
    this.setState({ quotaRuleListDocument, queryParams });
  }

  onRemove(ruleId) {
    const {
      openSnackBar,
      closeModal,
    } = this.props;
    return () => {
      api.removeQuota({ ruleId })
        .then(() => {
          const messageContent = `Quota "${ruleId}" Removed`;
          openSnackBar({ messageContent });
          closeModal();
          this.onRefresh();
        })
        .catch(() => {
          const messageContent = 'Error Removing Quota';
          openSnackBar({ messageContent, messageColor: 'secondary' });
        });
    };
  }

  openRemove(currentRuleId) {
    const { openModal } = this.props;
    return () => {
      const onOpen = () => openModal({ modalName: QUOTA_REMOVE_MODAL });
      this.setState({ currentRuleId }, onOpen);
    };
  }

  render() {
    const {
      quotaRuleListDocument,
      currentRuleId,
    } = this.state;
    const {
      closeModal,
      modalName,
      openModal,
    } = this.props;
    return (
      <>
        <QuotaTitle
          openCode={() => openModal({ modalName: QUOTA_CODE_MODAL })}
          openCreate={() => openModal({ modalName: QUOTA_CREATE_MODAL })}
          onRefresh={this.onRefresh}
        />
        <QuotaFilter
          onFilter={this.onFilter}
          onRefresh={this.onRefresh}
        />
        <QuotaList
          quotaRuleListDocument={quotaRuleListDocument}
          onRefresh={this.onRefresh}
          openRemove={this.openRemove}
        />
        { currentRuleId
          && (
          <QuotaRemove
            isOpen={(modalName === QUOTA_REMOVE_MODAL)}
            closeModal={closeModal}
            onRemove={this.onRemove}
            ruleId={currentRuleId}
          />
          )}
        <QuotaDialog
          isOpen={(modalName === QUOTA_CREATE_MODAL)}
          closeModal={closeModal}
          onRefresh={this.onRefresh}
        />
        <CodeModal
          isOpen={(modalName === QUOTA_CODE_MODAL)}
          toggleDialogue={closeModal}
          code={quotaRuleListDocument}
          title="QuotaRuleListDocument"
        />
      </>
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

export default connect(mapStateToProps, mapDispatchToProps)(AccessControl);
