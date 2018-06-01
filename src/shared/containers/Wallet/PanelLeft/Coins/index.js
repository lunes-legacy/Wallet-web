import React       from "react";
import styled      from "styled-components";
import style       from "Shared/style-variables";
import { TextBase, H1 } from "Components";
import { connect } from "react-redux";
//REDUX
import { openPanelRight } from 'Redux/actions';

import { Loading } from 'Components/Loading';

const StyledCoins = styled.div`
  width: auto;
  min-width: 100%;
  height: 100%;
  max-height: 100%;

`;
const StyledLoading = styled.div`
  margin-top: 115%;
  display: flex;
  align-items: center;
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

  margin-right:0px;
  box-shadow: none;
  transition: .3s;

  &:hover {
    box-shadow: 5px 0px 10px 5px rgba(51, 51, 51, 0.25);
    z-index: 3;
    margin-right: -20px;
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
  align-items: none;
  background-image: url(/img/app_wallet/rectangle-wallet.svg);
  background-size: 110%;
  font-size: 1rem;
  letter-spacing: 1.3px;
  height: 75px;
  
  padding-top: none;
  padding-left: 3rem;
  padding-bottom: 2rem;
  width: 100%;

  background-position: -5px 0px;
  background-repeat: no-repeat;

  border-top: solid 20px #654fa4;

  @media (${style.media.tablet2}) {
    font-size: 1.4rem;
    height: 95px;

    align-items: center;
    padding-top: none;
    border-top: none;
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
  width:100%;
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
      price: undefined
    };
  }

  //metodo chamado sempre que o componente é renderizado ou um
  //estado é atualizado
  _renderCoins = () => {
    let { currentNetwork }  = this.props.component.wallet;
    let { price }           = this.props.currencies;
    let { balance }         = this.props;
    if (!balance || !price) {
      return <Loading />;
    }
    let components = [];
    // EX: coinKey = 'btc';
    for (let coinKey in balance) {
      let currentBalance = balance[coinKey];
      let tmp = (
        <Coin
          key={coinKey}
          onClick={() => {
            this.props.openPanelRight();
          }}
        >
          <WrapCoinImg>
            <CoinImg src={`/img/coins/${coinKey.toLowerCase()}.svg`} />
          </WrapCoinImg>
          <WrapCoinData>
            <CoinAmount clWhite offSide size={"2.5rem"}>
              { currentBalance.total_confirmed }
            </CoinAmount>
            <CoinValue clWhite offSide size={"2rem"}>
              { `USD ${currentBalance.total_amount}` }
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
        <CoinsHeader txLight>MINHAS CARTEIRAS</CoinsHeader>

        { this._renderCoins() }
      </StyledCoins>
    );
  }
}

const mapStateToProps = state => {
  return {
    component:  state.component,
    currencies: state.currencies,
    balance:    state.balance
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openPanelRight: () => {
      dispatch(openPanelRight());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Coins);
