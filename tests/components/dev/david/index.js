import React from 'react';
import styled from 'styled-components';
// Private components
import style from 'Shared/style-variables';
import Modal from 'Components/Modal';
import { H3, Text } from 'Components/index';
import { ButtonGreen } from 'Components/Buttons';

const Green = styled.span`
  color: ${style.normalGreen};
`;

const toRender = () => {
	return(
    <Modal
      isOpen={true}
      height={'70%'}
      width={'50%'}
      type={'success'}
      title={'Sua leasing foi iniciada com sucesso'}
      hr
      text={
        <div>
          <H3>50.00000 <Green>LNS</Green></H3>
          <Text size={'1.2rem'} margin={'1rem'} clNormalGreen>Foram alocados para leasing na rede Lunes</Text>
          <Text size={'1.2rem'} margin={'1rem'}>Destinatário:</Text>
          <Text size={'1.2rem'} margin={'1rem'}>3P2HNUd5VUPLMQkJmctTPEeeHumiPN2GkTb</Text>
        </div>
      }
      footer={<ButtonGreen width={'50%'}>Iniciar um novo Leasing</ButtonGreen>}
    />
	);
}

export default toRender;

