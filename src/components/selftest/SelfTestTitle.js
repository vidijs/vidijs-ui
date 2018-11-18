import React from 'react';

import TitleHeader from '../ui/TitleHeader';
import SelfTestStatus from './SelfTestStatus';

export default function SelfTestTitle(props) {
  return (
    <TitleHeader
      title="Self Test"
      helpTo="/ref/self-test.html"
      iconList={
        <SelfTestStatus selfTestDocument={props.code} />
      }
      {...props}
    />
  );
}
