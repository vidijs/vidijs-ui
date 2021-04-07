import React from 'react';
import { compose } from 'redux';

import TitleHeader from '../components/ui/TitleHeader';
import ShapeSearchParams from '../components/shape/ShapeSearchParams';
import ShapeSearchDocument from '../components/shape/ShapeSearch';
import ShapeListTable from '../components/shape/ShapeListTable';

import withFormActions from '../hoc/withFormActions';
import withCard from '../hoc/withCard';
import withPaginationForm from '../hoc/withPaginationForm';

const SHAPE_SEARCH_FORM = 'SHAPE_SEARCH_FORM';
const ShapeListTableCard = compose(
  withCard,
  withPaginationForm,
)(ShapeListTable);

class ShapeSearch extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.onSearchSuccess = this.onSearchSuccess.bind(this);
    this.onSetUrlParams = this.onSetUrlParams.bind(this);
    this.onGetUrlParams = this.onGetUrlParams.bind(this);
    const params = this.onGetUrlParams();
    const {
      first = 1,
      number = 10,
      orderBy,
      orderDirection = 'desc',
      ...queryParams
    } = params;
    const sort = orderBy ? [{ field: orderBy, order: `${orderDirection}ending` }] : [];
    this.initialValues = {
      queryParams,
      matrixParams: {
        first,
        number,
      },
      itemSearchDocument: {
        sort,
      },
    };
    this.state = {
      shapeListDocument: undefined,
    };
  }

  componentDidMount() {
    document.title = 'vidi.js | Shape';
    this.onRefresh();
  }

  onRefresh() {
    const { submitForm } = this.props;
    submitForm(SHAPE_SEARCH_FORM);
  }

  onSearchSuccess(response) {
    const { data: shapeListDocument, queryParams } = response;
    this.setState({
      shapeListDocument,
      queryParams,
    });
    this.onSetUrlParams(queryParams);
  }

  onSetUrlParams(params) {
    const {
      location,
      history,
    } = this.props;
    const urlParams = new URLSearchParams(location.search);
    Object.entries(params).forEach(([k, v]) => urlParams.set(k, v));
    history.push({ search: urlParams.toString() });
  }

  onGetUrlParams() {
    const { location } = this.props;
    const urlParams = new URLSearchParams(location.search);
    const params = {};
    Array.from(urlParams).forEach(([k, v]) => { params[k] = v; });
    return params;
  }

  render() {
    const {
      shapeListDocument,
      queryParams,
    } = this.state;
    return (
      <>
        <TitleHeader
          title="Shape"
          helpTo="/ref/item/shape.html"
          onRefresh={this.onRefresh}
          code={shapeListDocument}
          codeModal="ShapeListDocument"
        />
        <ShapeSearchDocument
          form={SHAPE_SEARCH_FORM}
          defaultExpanded={false}
          onSuccess={this.onSearchSuccess}
          initialValues={this.initialValues}
          destroyOnUnmount={false}
        />
        <ShapeSearchParams
          form={SHAPE_SEARCH_FORM}
          defaultExpanded={false}
          onSuccess={this.onSearchSuccess}
          initialValues={this.initialValues}
          destroyOnUnmount={false}
        />
        <ShapeListTableCard
          shapeListDocument={shapeListDocument}
          queryParams={queryParams}
          form={SHAPE_SEARCH_FORM}
          sortField="shapeSearchDocument.sort"
        />
      </>
    );
  }
}

export default compose(withFormActions)(ShapeSearch);
