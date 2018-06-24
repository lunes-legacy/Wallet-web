import React from 'react';
import styled from 'styled-components';
// Private components
import style from 'Shared/style-variables';
import { Modal } from 'Components/index';
// import Configuration from 'Containers/Configuration/index';

class Test extends React.Component {
  constructor() {
    super();
    this.state = {
      open: true
    }

    this.toggleOpen = this.toggleOpen.bind(this);
  }

  toggleOpen() {
    this.setState(prevState => ({
      open: !prevState.open
    }));
  }

  render() {
    return(
      <Modal
        isOpen={this.state.open}
        onClose={this.toggleOpen}
        height={'70%'}
        width={'40%'}
        title={'Sua leasing foi iniciada com sucesso'}
      />
    );
  }
}

const toRender = () => {
	return(
    <Test />
	);
}

export default toRender;

