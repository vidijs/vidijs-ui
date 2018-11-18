import React from 'react';
import { compose } from 'redux';

import AuditLogTitle from '../components/auditlog/AuditLogTitle';
import AuditLogFilterCard from '../components/auditlog/AuditLogFilterCard';
import AuditLogCard from '../components/auditlog/AuditLogCard';
import withFormActions from '../hoc/withFormActions';
import withFormSelectors from '../hoc/withFormSelectors';

const AUDITLOG_FILTER_FORM = 'AUDITLOG_FILTER_FORM';

class AuditLog extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
    this.onChangeRowsPerPage = this.onChangeRowsPerPage.bind(this);
    this.onChangeOrder = this.onChangeOrder.bind(this);
    this.state = {
      auditLogDocument: undefined,
      count: undefined,
      page: undefined,
      rowsPerPage: undefined,
      orderDirection: undefined,
    };
  }

  componentDidMount() {
    document.title = 'vidi.js | Audit Log';
    this.onRefresh();
  }

  onRefresh() {
    const { submitForm } = this.props;
    submitForm(AUDITLOG_FILTER_FORM);
  }

  onSuccess(response) {
    const auditLogDocument = response.data;
    const { formValues = {} } = this.props;
    const { queryParams = {} } = formValues;
    const { first = 0, rows = 100 } = queryParams;
    const { count = 0 } = auditLogDocument;
    const page = Math.ceil(count / rows) - Math.ceil((count - first) / rows);
    this.setState({
      count,
      rowsPerPage: rows,
      page,
      auditLogDocument,
    });
  }

  async onChangePage({ page }) {
    const { formValues = {}, changeForm } = this.props;
    const { queryParams = {} } = formValues;
    const { rows = 100 } = queryParams;
    const first = page * rows;
    changeForm(AUDITLOG_FILTER_FORM, 'queryParams.first', first);
    await changeForm(AUDITLOG_FILTER_FORM, 'queryParams.rows', rows);
    this.onRefresh();
  }

  async onChangeRowsPerPage({ target: { value: rows } } = {}) {
    const { changeForm } = this.props;
    const first = 0;
    changeForm(AUDITLOG_FILTER_FORM, 'queryParams.first', first);
    await changeForm(AUDITLOG_FILTER_FORM, 'queryParams.rows', rows);
    this.onRefresh();
  }

  async onChangeOrder() {
    const { changeForm } = this.props;
    const { orderDirection: prevOrderDirection } = this.state;
    let newOrderDirection;
    if (prevOrderDirection === undefined) {
      newOrderDirection = 'desc';
    } else if (prevOrderDirection === 'desc') {
      newOrderDirection = 'asc';
    }
    this.setState({ orderDirection: newOrderDirection });
    await changeForm(AUDITLOG_FILTER_FORM, 'queryParams.sort', newOrderDirection);
    this.onRefresh();
  }

  render() {
    const {
      auditLogDocument,
      count,
      page,
      rowsPerPage,
      orderDirection,
    } = this.state;
    return (
      <React.Fragment>
        <AuditLogTitle
          code={auditLogDocument}
          codeModal="AuditLogDocument"
          onRefresh={this.onRefresh}
        />
        <AuditLogFilterCard
          form={AUDITLOG_FILTER_FORM}
          onSuccess={this.onSuccess}
        />
        {auditLogDocument &&
        <AuditLogCard
          auditLogDocument={auditLogDocument}
          count={count}
          page={page}
          rowsPerPage={rowsPerPage}
          onChangePage={this.onChangePage}
          onChangeRowsPerPage={this.onChangeRowsPerPage}
          onChangeOrder={this.onChangeOrder}
          orderDirection={orderDirection}
        />
        }
      </React.Fragment>
    );
  }
}

export default compose(withFormActions, withFormSelectors)(AuditLog, AUDITLOG_FILTER_FORM);
