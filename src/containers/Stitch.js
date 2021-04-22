import React from 'react';

import TitleHeader from '../components/ui/TitleHeader';
import StitchCard from '../components/stitch/StitchCard';

export default class Stitch extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      url: undefined,
    };
  }

  componentDidMount() {
    document.title = 'xray | Stitch';
  }

  render() {
    const { url } = this.state;
    return (
      <>
        <TitleHeader
          title="Stitch Images"
          helpTo="/ref/misc/stitching.html"
        />
        <StitchCard
          url={url}
          onSuccess={(newUrl) => this.setState({ url: newUrl })}
          onFail={() => this.setState({ url: undefined })}
        />
      </>
    );
  }
}
