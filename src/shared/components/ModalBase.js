import React from 'react';
import styled from 'styled-components';

// Private components
// import style from 'Components/style-variables';
import { H3, TextBase } from 'Components/index';

const types = {
  success: styled.div`
    height: 3rem;
    width: 3rem;
    border-radius: 50%;
    background-color: green;
  `,
  error: styled.div`
    height: 3rem;
    width: 3rem;
    border-radius: 50%;
    background-color: red;
  `
}

const ModalScreen = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.5);
`;

const ModalBox = styled.div`
  background-color: #fefefe;
  margin: 10% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;

  @media (min-width: 790px) {
    width: 30%;
  }
`;

const Close = styled.span`
  color: #aaa;
  float: right;
  font-size: 2.5rem;
  font-weight: bold;
  margin-top: -1rem;

  &:hover {
    color: #333;
    text-decoration: none;
    cursor: pointer;
  }
`;

const Header = styled.div`
  min-height: 2rem;
  width: 100%;
`;

const Content = styled.div`
  min-height: 5rem;
  width: 100%;
`;

const P = styled.p`
  ${TextBase};
`;

const Footer = styled.div`
  min-height: 2rem;
  width: 100%;
`;


class ModalBase extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isVisible: false
    }
  }

  render() {
    return (
      <ModalScreen>
        <ModalBox>
          <Header>
            <Close>&times;</Close>
            <H3>{this.props.header || ''}</H3>
          </Header>
          <Content>
            {types[this.props.type] || ''}
            <H3>{this.props.title || ''}</H3>
            <P>{this.props.text || ''}</P>
          </Content>
          <Footer>
            <P>{this.props.footer || ''}</P>
          </Footer>
        </ModalBox>
      </ModalScreen>
    );
  }
}

export default ModalBase;
