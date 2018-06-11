import React from 'react';
// Private components
import Modal from 'Components/modal';

const toRender = () => {
	return(
    <Modal
      isOpen={true}
      height={'70%'}
      width={'40%'}
      type={'success'}
      title={'Sua leasing foi iniciada com sucesso'}
      hr
      text={'Teste de parágrafo do conteúdo'}
    />
	);
}

export default toRender;

