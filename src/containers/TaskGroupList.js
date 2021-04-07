import React from 'react';
import { connect } from 'react-redux';

import { taskgroup as api } from '@vidijs/vidijs-api';
import TaskGroupListTitle from '../components/taskgroup/TaskGroupListTitle';
import TaskGroupListCard from '../components/taskgroup/TaskGroupListCard';
import TaskGroupDialog from '../components/taskgroup/TaskGroupDialog';
import CodeModal from '../components/ui/CodeModal';

import * as actions from '../actions';

const TASKGROUPLIST_CODE_MODAL = 'TASKGROUPLIST_CODE_MODAL';
const TASKGROUPLIST_CREATE_MODAL = 'TASKGROUPLIST_CREATE_MODAL';

class TaskGroupList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.state = {
      taskGroupListDocument: undefined,
    };
  }

  componentDidMount() {
    document.title = 'vidi.js | Task Group';
    this.onRefresh();
  }

  onRefresh() {
    const { openSnackBar } = this.props;
    try {
      api.listTaskGroup()
        .then((response) => response.json())
        .then((taskGroupListDocument) => this.setState({ taskGroupListDocument }));
    } catch (error) {
      const messageContent = 'Error Loading Task Groups';
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
      taskGroupListDocument,
    } = this.state;
    return (
      <>
        <TaskGroupListTitle
          openCode={() => openModal({ modalName: TASKGROUPLIST_CODE_MODAL })}
          openCreate={() => openModal({ modalName: TASKGROUPLIST_CREATE_MODAL })}
          onRefresh={this.onRefresh}
        />
        {taskGroupListDocument
          && (
          <TaskGroupListCard
            taskGroupListDocument={taskGroupListDocument}
          />
          )}
        <CodeModal
          isOpen={(modalName === TASKGROUPLIST_CODE_MODAL)}
          toggleDialogue={closeModal}
          code={taskGroupListDocument}
          title="TaskGroupListDocument"
        />
        <TaskGroupDialog
          isOpen={(modalName === TASKGROUPLIST_CREATE_MODAL)}
          closeModal={closeModal}
          history={history}
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

export default connect(mapStateToProps, mapDispatchToProps)(TaskGroupList);
