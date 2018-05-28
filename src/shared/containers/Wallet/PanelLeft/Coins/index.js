import React       from "react";
import styled      from "styled-components";
import style       from "Shared/style-variables";
import { TextBase, H1 } from "Components";
import { connect } from "react-redux";

import { Loading } from "Components/Loading";

const StyledCoins = styled.div`
  width: auto;
  min-width: 100%;
  height: 100%;
  max-height: 100%;
  overflow-y: auto;
`;

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

  box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0);
  transform: translateX(0);
  transition: transform .3s, box-shadow .4s;

  &:hover {
    box-shadow: 5px 0px 10px 5px rgba(51, 51, 51, 0.25);
    transform: translateX(20px);
    z-index: 3;
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
  background-image: url(/img/app_wallet/rectangle-wallet.svg);
  background-size: 100% 100%;
  font-size: 1rem;
  height: 75px;
  justify-content: center;
  padding-bottom: 2rem;
  width: 100%;

  @media (${style.media.tablet2}) {
    font-size: 1.4rem;
    height: 95px;
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
  renderCoins = () => {
    // let { balance, coinsPrice } = this.props.wallet.panelLeft;

    // if (!coinsPrice || !balance) {
    //   return <Loading />;
    // } else if (!balance.btc) {
    //   return <H1>Moeda(BTC) não encontrada</H1>;
    // }
    // let components = [];
    //EX: coinKey = 'btc';
    //DINAMICO
    // for (let coinKey in balance) {
    //   console.log(coinsPrice, "OAIDOIASODIASIDSAIDISADIODi");
    //   let tmp = (
    //     <Coin
    //       key={coinKey}
    //       onClick={() => {
    //         this.props.openPanelRight({ coinPrice: coinsPrice[coinKey], coinName: coinKey, isOpenModalReceive: false });
    //       }}
    //     >
    //       <WrapCoinImg>
    //         <CoinImg src="/img/bitcoin.svg" />
    //       </WrapCoinImg>
    //       <WrapCoinData>
    //         <CoinAmount clWhite offSide size={"2.5rem"}>
    //           { balance[coinKey].total_confirmed }
    //         </CoinAmount>
    //         <CoinValue clWhite offSide size={"2rem"}>
    //           { `USD ${balance[coinKey].total_amount}` }
    //         </CoinValue>
    //       </WrapCoinData>
    //     </Coin>
    //   );
    //   components.push(tmp);
    // }
    // return components;
    let coinsPrice = {
      lns:  { USD:1000,  BRL:3000  },
      btc:  { USD:10000, BRL:30000 },
      eth:  { USD:5000,  BRL:15000 },
      ltc:  { USD:200,   BRL:600   },
      dash: { USD:200,   BRL:600   },
      nano: { USD:200,   BRL:600   }
    };
    let balance = {
      lns:  { total_confirmed: 500, total_unconfirmed: 0, total_amount: 500 },
      btc:  { total_confirmed: 2,   total_unconfirmed: 0, total_amount: 2 },
      eth:  { total_confirmed: 3,   total_unconfirmed: 1, total_amount: 4 },
      ltc:  { total_confirmed: 12,  total_unconfirmed: 0, total_amount: 12 },
      dash: { total_confirmed: 30,  total_unconfirmed: 0, total_amount: 30 },
      nano: { total_confirmed: 50,  total_unconfirmed: 0, total_amount: 50 },
    }
    let components = [];
    for (let coinKey in balance) {
      let tmp = (
        <Coin
          key={coinKey}
          onClick={() => {
            this.props.openPanelRight({ coinPrice: coinsPrice[coinKey], coinName: coinKey, isOpenModalReceive: false });
          }}
        >
          <WrapCoinImg>
            <CoinImg src="/img/bitcoin.svg" />
          </WrapCoinImg>
          <WrapCoinData>
            <CoinAmount clWhite offSide size={"2.5rem"}>
              { balance[coinKey].total_confirmed }
            </CoinAmount>
            <CoinValue clWhite offSide size={"2rem"}>
              { `USD ${balance[coinKey].total_amount}` }
            </CoinValue>
          </WrapCoinData>
        </Coin>
      );
      components.push(tmp);
    }
    return components;
  }

  render() {
    return (
      <StyledCoins>
        <CoinsHeader>MINHAS CARTEIRAS</CoinsHeader>

        { this.renderCoins() }
      </StyledCoins>
    );
  }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(Coins);
