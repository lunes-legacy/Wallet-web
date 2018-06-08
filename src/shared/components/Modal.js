/**
 * Componente padrão para Modais
 *
 * Lista de props, com exceção da isOpen, todas são opcionais:
 * isOpen: true | false. Passar função que altera o estado
 * width: default 40%
 * height: default 50%
 * header: texto do cabeçalho da modal
 * headerAlign: alinhamento do cabeçalho (left, center, right, justify). Default: center
 * title: título do conteúdo
 * text: texto do conteúdo
 * hr: true | false. Linha que divide o título do texto. Default: false
 * contentAlign: alinhamento do conteúdo. Default: center
 * footer: texto do rodapé
 * footerAlign: alinhamento do rodapé. Default:
 *
 * Exemplo:
 * <Modal
      isOpen={true}
      height={'70%'}
      width={'40%'}
      header={'Título da modal'}
      headerAlign={'justify'}
      hr
      title={'Sua leasing foi iniciada com sucesso'}
      text=<div style={{color: '#d2d'}}>Também pode ser passado um componente como conteúdo</div>
    />
 */

import React from 'react';
import styled from 'styled-components';

// Private components
import style from 'Components/style-variables';
import { H1, H3, TextBase } from 'Components/index';

const ModalScreen = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,0.2);
`;

const ModalBox = styled.div`
  background-color: #442181;
  color: #fff;
  margin: 10% auto;
  padding: 2rem;
  box-shadow: 0px 0px 5px 0px rgba(51,51,51,.1);
  width: 80%;
  height: 85%;
  border-radius: 5px;

  @media (${style.media.tablet2}) {
    width: ${props => props.width ? props.width : '40%'};
    height: ${props => props.height ? props.height : '50%'};
  }
`;

const Close = styled.span`
  color: #aaa;
  float: right;
  font-size: 2rem;
  font-weight: bold;
  margin-top: -1.5rem;

  &:hover {
    color: #333;
    text-decoration: none;
    cursor: pointer;
  }
`;

const Header = styled.div`
  height: 5%;
  margin: 1rem 0;
  width: 100%;
  text-align: ${props => props.align ? props.align : 'center'}
`;

const ContentH1 = H1.extend`
  font-size: 3rem;

  @media (${style.media.tablet2}) {
    font-size: 5rem;
  }
`;

const Content = styled.div`
  height: 70%;
  width: 100%;
  text-align: ${props => props.align ? props.align : 'center'}
`;

const P = styled.p`
  ${TextBase};
  margin: 1rem 0;
`;

const Hr = styled.hr`
  border: solid 1px #654fa4;
  margin: 1rem 25%;
  width: 50%;
`;

const Footer = styled.div`
  height: 10%;
  margin: 1rem 0;
  width: 100%;
  text-align: ${props => props.align ? props.align : 'center'}
`;


class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: this.props.isOpen || true
    }
  }

  toggleModal = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    const types = {
      success: 'sucesso',
      error: 'erro'
    }

    if (!this.state.isModalOpen) return null;

    return (
      <ModalScreen>
        <ModalBox width={this.props.width} height={this.props.height}>
          <Header align={this.props.headerAlign}>
            <Close onClick={() => this.toggleModal()}>&times;</Close>
            <H3>{this.props.header || ''}</H3>
          </Header>
          <Content align={this.props.contentAlign}>
            {/* {types[this.props.type] || ''} */}
            <ContentH1 fontSize={'4rem'} txLight>{this.props.title || ''}</ContentH1>
            {this.props.hr ? <Hr /> : ''}
            <P fontSize={'1.4rem'}>{this.props.text || ''}</P>
          </Content>
          <Footer align={this.props.footerAlign}>
            <P sifontSize={'1.4rem'}>{this.props.footer || ''}</P>
          </Footer>
        </ModalBox>
      </ModalScreen>
    );
  }
}

export default Modal;
