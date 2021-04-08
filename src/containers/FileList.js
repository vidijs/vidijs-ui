import React from 'react';
import { compose } from 'redux';

import FileListTitle from '../components/file/FileListTitle';
import FileFilter from '../components/file/FileFilter';
import FileListCard from '../components/file/FileListCard';
import FilePrefixCard from '../components/file/FilePrefixCard';
import FileEntity from '../components/file/FileEntity';
import withFormActions from '../hoc/withFormActions';
import withFormSelectors from '../hoc/withFormSelectors';

const FILE_FILTER_FORM = 'FILE_FILTER_FORM';
const FILE_ENTITY_DIALOG = 'FILE_ENTITY_DIALOG';

class FileList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
    this.onChangeRowsPerPage = this.onChangeRowsPerPage.bind(this);
    this.onChangeOrder = this.onChangeOrder.bind(this);
    this.onChangePrefix = this.onChangePrefix.bind(this);
    this.state = {
      fileListDocument: undefined,
      count: undefined,
      page: undefined,
      rowsPerPage: undefined,
      orderBy: undefined,
      orderDirection: undefined,
    };
  }

  componentDidMount() {
    document.title = 'xray | File';
    this.onRefresh();
  }

  onRefresh() {
    const { submitForm } = this.props;
    submitForm(FILE_FILTER_FORM);
  }

  onSuccess(response) {
    const fileListDocument = response.data;
    const { formValues = {} } = this.props;
    const { matrixParams = {} } = formValues;
    const { first = 0, number = 10 } = matrixParams;
    const { hits = 0 } = fileListDocument;
    const page = Math.ceil(hits / number) - Math.ceil((hits - first) / number);
    this.setState({
      count: hits,
      rowsPerPage: number,
      page,
      fileListDocument,
    });
  }

  async onChangePage({ page }) {
    const { formValues = {}, changeForm } = this.props;
    const { matrixParams = {} } = formValues;
    const { number = 10 } = matrixParams;
    const first = page * number;
    changeForm(FILE_FILTER_FORM, 'matrixParams.first', first);
    await changeForm(FILE_FILTER_FORM, 'matrixParams.number', number);
    this.onRefresh();
  }

  async onChangePrefix(prefix) {
    const { changeForm } = this.props;
    await changeForm(FILE_FILTER_FORM, 'queryParams.path', prefix);
    this.onRefresh();
  }

  async onChangeRowsPerPage({ target: { value: number } } = {}) {
    const { changeForm } = this.props;
    const first = 0;
    changeForm(FILE_FILTER_FORM, 'matrixParams.first', first);
    await changeForm(FILE_FILTER_FORM, 'matrixParams.number', number);
    this.onRefresh();
  }

  onChangeOrder(orderBy) {
    return async () => {
      const { changeForm } = this.props;
      const { orderDirection: prevOrderDirection, orderBy: prevOrderBy } = this.state;
      let sort = '';
      let newOrderDirection;
      let newOrderBy;
      if (orderBy !== prevOrderBy) {
        newOrderBy = orderBy;
        newOrderDirection = 'desc';
        sort = [`${orderBy} ${newOrderDirection}`];
      } else if (prevOrderDirection === 'desc') {
        newOrderBy = orderBy;
        newOrderDirection = 'asc';
        sort = [`${orderBy} ${newOrderDirection}`];
      }
      this.setState({ orderBy: newOrderBy, orderDirection: newOrderDirection });
      await changeForm(FILE_FILTER_FORM, 'matrixParams.sort', sort);
      this.onRefresh();
    };
  }

  render() {
    const {
      fileListDocument,
      count,
      page,
      rowsPerPage,
      orderBy,
      orderDirection,
    } = this.state;
    const { history } = this.props;
    return (
      <>
        <FileListTitle
          code={fileListDocument}
          codeModal="FileListDocument"
          createModal={FILE_ENTITY_DIALOG}
          onRefresh={this.onRefresh}
        />
        <FileFilter
          form={FILE_FILTER_FORM}
          onSuccess={this.onSuccess}
        />
        {fileListDocument && (
          <>
            { fileListDocument.prefixes && (
              <FilePrefixCard
                filePrefixType={fileListDocument.prefixes}
                onChangePrefix={this.onChangePrefix}
              />
            )}
            <FileListCard
              fileListDocument={fileListDocument}
              count={count}
              page={page}
              rowsPerPage={rowsPerPage}
              onChangePage={this.onChangePage}
              onChangeRowsPerPage={this.onChangeRowsPerPage}
              onChangeOrder={this.onChangeOrder}
              orderBy={orderBy}
              orderDirection={orderDirection}
            />
          </>
        )}
        <FileEntity
          dialogName={FILE_ENTITY_DIALOG}
          onSuccess={(response) => history.push(`/file/${response.data.id}`)}
        />
      </>
    );
  }
}

export default compose(withFormActions, withFormSelectors)(FileList, FILE_FILTER_FORM);
