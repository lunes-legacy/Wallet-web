/**
 * Props:
 * - amount: total de Lunes enviados para leasing
 * - receiver: endereço que receberá os Lunes para leasing
 *
 * Exemplo: <ModalConfirm amount={50.00000} receiver={'3P2HNUd5VUPLMQkJmctTPEeeHumiPN2GkTb'} />
 */

import React from 'react';
import styled from 'styled-components';

// Private components
import style from 'Shared/style-variables';
import { H3, Text, Modal } from 'Components/index';
import { ButtonGreen } from 'Components/Buttons';

const Green = styled.span`
  color: ${style.normalGreen};
`;

class ModalConfirm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: true
    }
  }

  render() {
    return(
      <Modal
        isOpen={this.state.isOpen}
        height={'70%'}
        width={'50%'}
        type={'success'}
        title={'Sua leasing foi iniciada com sucesso'}
        hr
        text={
          <div>
            <H3>{this.props.amount} <Green>LUNES</Green></H3>
            <Text size={'1.2rem'} margin={'1rem'} clNormalGreen> were allocated for leasing on the lunes network</Text>
            <Text size={'1.2rem'} margin={'1rem'}>Mining node address:</Text>
            <Text size={'1.2rem'} margin={'1rem'}>{this.props.receiver}</Text>
          </div>
        }
        footer={<ButtonGreen width={'50%'}>Start a new leasing</ButtonGreen>}
      />
    );
  }
}

export default ModalConfirm;
