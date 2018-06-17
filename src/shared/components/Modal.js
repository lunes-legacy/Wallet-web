/**
 * Componente padrão para Modais
 *
 * Lista de props, com exceção da isOpen e onClose, todas são opcionais:
 * isOpen: true | false. Exibe ou não a modal
 * onClose: true | false. Passar função que altera o estado
 * width: default 40%
 * height: default 50%
 * type: 'success' | 'error'. Exibe um ícone verde para sucesso e vermelho para erro
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
      onClose={this.toggleModalOpen}
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
import style from 'Shared/style-variables';
import { H3, TextBase } from 'Components/index';

const ModalScreen = styled.div`
  position: fixed;
  z-index: 9998;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,0.3);
`;

const ModalBox = styled.div`
  z-index: 9999;
  background-color: #442181;
  color: #fff;
  margin: 5% auto 0 auto;
  padding: 2rem;
  box-shadow: 0px 0px 5px 0px rgba(51,51,51,.1);
  width: 65%;
  height: 50%;
  border-radius: 5px;

  @media (${style.media.tablet2}) {
    width: ${props => props.width ? props.width : '40%'};
    height: ${props => props.height ? props.height : '50%'};
  }

  @media (${style.media.desktop2}) {
    width: 40%;
    height: 45%;
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

const ContentH1 = styled.h1`
  ${TextBase};
  font-size: 3rem;

  @media (${style.media.tablet2}) {
    font-size: 4rem;
  }
`;

const Content = styled.div`
  height: 75%;
  width: 100%;
  text-align: ${props => props.align ? props.align : 'center'}
`;

const P = styled.div`
  ${TextBase};
  margin: 1rem 0;
`;

const Hr = styled.hr`
  border: solid 1px #654fa4;
  margin: 1.5rem 25%;
  width: 50%;
`;

const Footer = styled.div`
  height: 20%;
  margin: 1rem 0;
  width: 100%;
  text-align: ${props => props.align ? props.align : 'center'}
`;

const Icon = styled.div`
  position: relative;
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  margin: 0 1rem;
  background-color: ${props => props.color};
  left: calc(50% - 37px);
  margin-bottom: 1rem;

  @media (${style.media.tablet2}) {
    width: 7rem;
    height: 7rem;
  }
`

const SuccessContent = styled.div`
  width: 0.8rem;
  height: 1.5rem;
  border-bottom: 3px solid #fff;
  border-right: 3px solid #fff;
  transform: rotate(45deg);
  position: relative;
  top: calc(50% - 1rem);
  left: calc(50% - 0.4rem);

  @media (${style.media.tablet2}) {
    width: 1rem;
    height: 2rem;
    top: calc(50% - 1.5rem);
    left: calc(50% - 0.5rem);
  }
`;

const Error = styled.div`
  color: #d22;
`;

class Modal extends React.Component {
  render() {
    if (!this.props.isOpen) return null;

    const types = {
      success: <Icon color={style.normalGreen}><SuccessContent /></Icon>,
      error: <Icon color={style.normalRed}><SuccessContent /></Icon>
    };

    return (
      <ModalScreen>
        <ModalBox width={this.props.width} height={this.props.height}>
          <Header align={this.props.headerAlign}>
            <Close onClick={this.props.onClose}>&times;</Close>
            <H3>{this.props.header || ''}</H3>
          </Header>
          <Content align={this.props.contentAlign}>
            {types[this.props.type] || ''}
            <ContentH1 txLight>{this.props.title || ''}</ContentH1>
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
