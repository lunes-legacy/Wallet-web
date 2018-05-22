import React from "react";
import styled from "styled-components";
import style from "Shared/style-variables";
import { TextBase } from "Components/TextBase";
import { connect } from "react-redux";

import { Loading } from "Components/Loading";


const Coin = styled.div`
  background: ${style.normalLilac};
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  flex-flow: nowrap;
  height: 70px;
  min-width: 100%;
  padding: 0 1rem;
  width: auto;

  box-shadow: 30px 0px 20px rgba(0, 0, 0, 0);
  transform: translateX(0);
  transition: transform .3s, box-shadow .4s;

  &:hover {
    box-shadow: 20px 0px 40px rgba(0, 0, 0, 0.1);
    transform: translateX(20px);
  }

  @media (${style.media.tablet2}) {
    padding: 0 2rem;
    height: 85px;
  }

  @media (${style.media.laptop}) {
    padding: 0 3rem;
    height: 100px;
  }
`;

const CoinsHeader = styled.div`
  ${TextBase}
  display: flex;
  align-items: center;
  background: #654fa4;
  font-size: 1.2rem;
  height: 60px;
  justify-content: center;
  width: 100%;

  @media (${style.media.tablet2}) {
    font-size: 1.4rem;
  }
`;

const WrapCoinImg = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const CoinImg = styled.img`
  width: 25px;
  height: 25px;
  min-width: 25px;

  @media (${style.media.tablet2}) {
    width: 32px;
    height: 32px;
  }

  @media (${style.media.laptop}) {
    width: 40px;
    height: 40px;
  }
`;

const WrapCoinData = styled.div`
  display: flex;
  flex-flow: wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
`;

const CoinValue = styled.div`
  ${TextBase}
  width: 100%;
  text-align: right;
  font-size: 1.2rem;

  @media (${style.media.tablet2}) {
    font-size: 1.4rem;
  }
`;

const CoinAmount = CoinValue.extend``;

class Coins extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      balance: undefined,
      coinsPrice: undefined
    };
  }
  render() {
    let { balance, coinsPrice } = this.props;
    return (
      <div>
        <CoinsHeader clWhite>MINHAS CARTEIRAS</CoinsHeader>

        <img src={"/img/wave-my-wallets.png"} style={{ width: "100%" }} />

        {(() => {
          if (!coinsPrice || !balance) {
            return <Loading />;
          } else if (!balance.btc) {
            return <H1>Moeda(BTC) não encontrada</H1>;
          }
          let components = [];
          //EX: coinKey = 'btc';
          for (let coinKey in balance) {
            components.push(
              <Coin
                key={coinKey}
                onClick={() => {
                  this.props.openPanelRight({ coinPrice: coinsPrice[coinKey], coinName: coinKey });
                }}
              >
                <WrapCoinImg>
                  <CoinImg src="/img/bitcoin.svg" />
                </WrapCoinImg>
                <WrapCoinData>
                  <CoinAmount clWhite offSide>
                    0.04201921{/* {balance[coinKey].total_confirmed} */}
                  </CoinAmount>
                  <CoinValue clWhite offSide>
                    USD 348,75{/* {`USD ${balance[coinKey].total_amount}`} */}
                  </CoinValue>
                </WrapCoinData>
              </Coin>
            );
          }
          return components;
        })()}
      </div>
    );
  }
}

const styledCoins = styled(Coins)`
  width: auto;
  min-width: 100%;
`;

const mapStateToProps = state => {
  return {
    wallet: state.wallet
  };
};
const mapDispatchToProps = dispatch => {
  return {
    openPanelRight: ({ coinPrice, coinName }) => {
      dispatch({
        type: "WALLET_OPEN_PANELRIGHT",
        payload: { coinPrice, coinName }
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(styledCoins);
