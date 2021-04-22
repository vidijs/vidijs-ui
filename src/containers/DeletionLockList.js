import React from 'react';
import { compose } from 'redux';

import DeletionLockListTitle from '../components/deletionlock/DeletionLockListTitle';
import DeletionLockListFilterCard from '../components/deletionlock/DeletionLockListFilterCard';
import DeletionLockListCard from '../components/deletionlock/DeletionLockListCard';
import DeletionLockWizard from '../components/deletionlock/DeletionLockWizard';
import withFormActions from '../hoc/withFormActions';
import withFormSelectors from '../hoc/withFormSelectors';

const DELETIONLOCKLIST_FILTER_FORM = 'DELETIONLOCKLIST_FILTER_FORM';
const DELETIONLOCK_CREATE_MODAL = 'DELETIONLOCK_CREATE_MODAL';

class DeletionLockList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
    this.onChangeRowsPerPage = this.onChangeRowsPerPage.bind(this);
    this.state = {
      deletionLockListDocument: undefined,
      count: undefined,
      page: undefined,
      rowsPerPage: undefined,
    };
  }

  componentDidMount() {
    document.title = 'xray | Deletion Lock';
    this.onRefresh();
  }

  onRefresh() {
    const { submitForm } = this.props;
    submitForm(DELETIONLOCKLIST_FILTER_FORM);
  }

  onSuccess(response) {
    const deletionLockListDocument = response.data;
    const { formValues = {} } = this.props;
    const { queryParams = {} } = formValues;
    const { first = 1, number = 100 } = queryParams;
    const { count = 0 } = deletionLockListDocument;
    const page = Math.ceil(count / number) - Math.ceil((count - first) / number);
    this.setState({
      count,
      rowsPerPage: number,
      page,
      deletionLockListDocument,
    });
  }

  async onChangePage({ page }) {
    const { formValues = {}, changeForm } = this.props;
    const { queryParams = {} } = formValues;
    const { number = 100 } = queryParams;
    const first = page * number;
    changeForm(DELETIONLOCKLIST_FILTER_FORM, 'queryParams.first', first);
    await changeForm(DELETIONLOCKLIST_FILTER_FORM, 'queryParams.number', number);
    this.onRefresh();
  }

  async onChangeRowsPerPage({ target: { value: number } } = {}) {
    const { changeForm } = this.props;
    const first = 1;
    changeForm(DELETIONLOCKLIST_FILTER_FORM, 'queryParams.first', first);
    await changeForm(DELETIONLOCKLIST_FILTER_FORM, 'queryParams.number', number);
    this.onRefresh();
  }

  render() {
    const {
      deletionLockListDocument,
      count,
      page,
      rowsPerPage,
    } = this.state;
    const {
      history, entityId, entityType, titleComponent: TitleComponent = DeletionLockListTitle,
    } = this.props;
    return (
      <>
        <TitleComponent
          code={deletionLockListDocument}
          codeModal="DeletionLockListDocument"
          onRefresh={this.onRefresh}
          createModal={DELETIONLOCK_CREATE_MODAL}
        />
        <DeletionLockListFilterCard
          form={DELETIONLOCKLIST_FILTER_FORM}
          onSuccess={this.onSuccess}
          entityId={entityId}
          entityType={entityType}
        />
        {deletionLockListDocument
          && (
            <DeletionLockListCard
              deletionLockListDocument={deletionLockListDocument}
              count={count}
              page={page}
              rowsPerPage={rowsPerPage}
              onChangePage={this.onChangePage}
              onChangeRowsPerPage={this.onChangeRowsPerPage}
              entityId={entityId}
              entityType={entityType}
            />
          )}
        <DeletionLockWizard
          dialogName={DELETIONLOCK_CREATE_MODAL}
          onSuccess={entityId ? this.onRefresh : ({ data }) => history.push(`/deletion-lock/${data.id}`)}
          entityId={entityId}
          entityType={entityType}
        />
      </>
    );
  }
}

export default compose(withFormActions, withFormSelectors)(
  DeletionLockList,
  DELETIONLOCKLIST_FILTER_FORM,
);
