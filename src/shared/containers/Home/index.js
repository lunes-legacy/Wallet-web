import React from "react";
import styled from "styled-components";
import style from "Shared/style-variables";
import { Redirect } from 'react-router-dom'

//COMPONENTS
import { H1 } from "Components/H1";
import { P } from "Components/P";
import { ButtonGreen } from "Components/Buttons";

const Container = styled.div`
  text-align: center;
  padding: 50px 50px;
  width: 100%;  
`;

const MainRectangle = styled.div`
  display: inline-block;
  margin: 20px;
  padding: 20px 0;
  width: 299px;
  border-radius: 10px;
  background-color: #442181;
  box-shadow: 3px 1px 15px 10px rgba(0, 0, 0, 0.09);    
  cursor: pointer;
`;

const Icon = styled.img`
  margin-top: 10px;
  height: 50px;
  
`;

const TextRectangle = styled.div`
  padding: 0 25px;
  width: 100%;
  height: 96px;
  text-align: center;
  
`;
const Paragraph = styled.div `
line-height: 1.5; 
font-size: 1.4rem;
color: white;
text-align: center;

`;

class Home extends React.Component {
  render() {
    return (
      <Container>
        <MainRectangle onClick={() => this.props.history.push('/app/wallet')}>
          <Icon src={"/img/app_panel_left/ic_wallet.svg"} />
          <H1 fontSize={"2rem"} margin={"1.5rem 0 1.5rem 0"} txBold txCenter clWhite>
            Wallet
          </H1>
          <TextRectangle>
            <Paragraph fontSize={"1.4rem"} txCenter clWhite>
              Meet the most well-designed wallets. <br /> Send, receive, and view the transaction history in a unique way. 
            </Paragraph>
          </TextRectangle>
        </MainRectangle>

        <MainRectangle onClick={() => this.props.history.push('/app/leasing')}>
          <Icon src={"/img/app_panel_left/ic_leasing.svg"} />
          <H1 fontSize={"2rem"} margin={"1.5rem 0 1.5rem 0"} txBold txCenter clWhite>
            Leasing
          </H1>
          <TextRectangle>
            <Paragraph fontSize={"1.4rem"} txCenter clWhite>
              Lend the forging power of your LUNES to a mining node and be rewarded at up to 5% per year.
            </Paragraph>
          </TextRectangle>
        </MainRectangle>

        <MainRectangle onClick={() => this.props.history.push('/app/privacy')}>
          <Icon src={"/img/app_panel_left/ic_privacy.svg"} />
          <H1 fontSize={"2rem"} margin={"1.5rem 0 1.5rem 0"} txBold txCenter clWhite>
            Privacy
          </H1>
          <TextRectangle>
            <Paragraph fontSize={"1.4rem"} txCenter clWhite>
              Access all vital information of your wallet and restore seeds at any time through our backup system.
            </Paragraph>
          </TextRectangle>
        </MainRectangle>

        {/* <MainRectangle onClick={() => this.props.history.push('/app/recharge')}>
          <Icon src={"/img/app_panel_left/ic_recharge.svg"} />
          <H1 fontSize={"2rem"} margin={"1.5rem 0 1.5rem 0"} txBold txCenter clWhite>
            Recarga
          </H1>
          <TextRectangle>
            <P fontSize={"1.4rem"} txCenter clWhite>
              Muito obrigado por escolher a Wallet Lunes como sua carteira multicoin. Aproveite da usabilidade e
              tecnologia desta incrível carteira e armazene suas criptomoedas com um alto nível de segurança..
            </P>
          </TextRectangle>
        </MainRectangle> */}

        {/* <MainRectangle onClick={() => this.props.history.push('/app/ticket')}>
          <Icon src={"/img/app_panel_left/ic_barcode.svg"} />
          <H1 fontSize={"2rem"} margin={"1.5rem 0 1.5rem 0"} txBold txCenter clWhite>
            Boleto
          </H1>
          <TextRectangle>
            <P fontSize={"1.4rem"} txCenter clWhite>
              Muito obrigado por escolher a Wallet Lunes como sua carteira multicoin. Aproveite da usabilidade e
              tecnologia desta incrível carteira e armazene suas criptomoedas com um alto nível de segurança..
            </P>
          </TextRectangle>
        </MainRectangle> */}

        {/* <MainRectangle onClick={() => this.props.history.push('/app/buy')}>
          <Icon src={"/img/app_panel_left/ic_buy.svg"} />
          <H1 fontSize={"2rem"} margin={"1.5rem 0 1.5rem 0"} txBold txCenter clWhite>
            Compras
          </H1>
          <TextRectangle>
            <P fontSize={"1.4rem"} txCenter clWhite>
              Muito obrigado por escolher a Wallet Lunes como sua carteira multicoin. Aproveite da usabilidade e
              tecnologia desta incrível carteira e armazene suas criptomoedas com um alto nível de segurança..
            </P>
          </TextRectangle>
        </MainRectangle> */}

        {/* <MainRectangle onClick={() => this.props.history.push('/app/portfolio')}>
          <Icon src={"/img/app_panel_left/ic_portfolio.svg"} />
          <H1 fontSize={"2rem"} margin={"1.5rem 0 1.5rem 0"} txBold txCenter clWhite>
            Portfólio
          </H1>
          <TextRectangle>
            <P fontSize={"1.4rem"} txCenter clWhite>
              Muito obrigado por escolher a Wallet Lunes como sua carteira multicoin. Aproveite da usabilidade e
              tecnologia desta incrível carteira e armazene suas criptomoedas com um alto nível de segurança..
            </P>
					</TextRectangle>
        </MainRectangle> */}

      </Container>
    );
  }
}

export default Home;
