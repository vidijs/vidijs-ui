import React from 'react';

import ServiceListServiceCard from './ServiceListServiceCard';
import ServiceDisable from './ServiceDisable';
import ServiceEnable from './ServiceEnable';
import withDialogProps from '../../hoc/withDialogProps';

const ENABLE_SERVICE_DIALOG = 'ENABLE_SERVICE_DIALOG';
const DISABLE_SERVICE_DIALOG = 'DISABLE_SERVICE_DIALOG';

function ServiceListCard({
  vidispineServiceListDocument,
  onRefresh,
  dialogProps,
  onOpen,
}) {
  const { service: serviceList = [] } = vidispineServiceListDocument;
  return (
    <>
      {
      serviceList.map((vidispineServiceDocument) => (
        <ServiceListServiceCard
          key={vidispineServiceDocument.name}
          vidispineServiceDocument={vidispineServiceDocument}
          onEnable={onOpen(ENABLE_SERVICE_DIALOG)}
          onDisable={onOpen(DISABLE_SERVICE_DIALOG)}
        />
      ))
      }
      <ServiceEnable
        {...dialogProps}
        dialogName={ENABLE_SERVICE_DIALOG}
        onSuccess={onRefresh}
      />
      <ServiceDisable
        {...dialogProps}
        dialogName={DISABLE_SERVICE_DIALOG}
        onSuccess={onRefresh}
      />
    </>
  );
}

export default withDialogProps(ServiceListCard);
