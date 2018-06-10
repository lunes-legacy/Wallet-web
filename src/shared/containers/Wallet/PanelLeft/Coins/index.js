import React       from "react";
import styled      from "styled-components";
import style       from "Shared/style-variables";
import { TextBase, H1 } from "Components";
import { connect } from "react-redux";
//REDUX
import { openPanelRight } from 'Redux/actions';
import { togglePanelLeft } from 'Redux/actions';

import { Loading } from 'Components/Loading';

import {numeral} from 'Utils/numeral';

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

  box-shadow: none;
  margin-right: 0px;
  margin-bottom: 10px;
  transition: .3s;

  &:hover {
    -webkit-transform:scale(1); 
    -moz-transform:scale(1); 
    -o-transform:scale(1); 
    transform:scale(1);
    box-shadow: 5px 0px 22px 5px rgba(0, 0, 0, 0.09);
    margin-right: -20px;
  }

  @media (${style.media.tablet2}) {
    padding: 0 2rem;
    height: 70px;
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
  font-size: 1rem;
  letter-spacing: 1.3px;
  height: 8rem;
  padding-top: 1.4rem;
  padding-left: 1.4rem;
  width: 100%;

  @media (${style.media.tablet2}) {
    font-size: 1.2rem;
    padding-top: 1.4rem;
    padding-left: 2rem;
  }

  @media (${style.media.laptop}) {
    align-items: center;
    border-top: none;
    padding-top: 0;
    padding-bottom: 3rem;
  }

  @media (${style.media.desktop}) {
    padding-bottom: 1.4rem;
  }
`;

const CoinHeaderBg = styled.img`
  height: 5rem;
  left: 0;
  margin: 0;
  object-fit: cover;
  padding: 0;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: -1;

  @media (${style.media.tablet2}) {
    object-fit: content;
    height: auto;
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
    numeral.locale(this.props.currencies.locale);
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
            this.props.openPanelRight({currentNetwork: coinKey.toLowerCase()}); 
            this.props.togglePanelLeft();
          }}
        >
          <WrapCoinImg>
            <CoinImg src={`/img/coins/${coinKey.toLowerCase()}.svg`} />
          </WrapCoinImg>
          <WrapCoinData>
            <CoinAmount clWhite offSide size={"2.5rem"}>
              { numeral(currentBalance.total_confirmed).format('0.00') }
            </CoinAmount>
            <CoinValue clWhite offSide size={"2rem"}>
              {/* { `USD ${currentBalance.total_amount}` } */}
              { `USD ${numeral(currentBalance.total_amount).format('0,0.00')}`}
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
        <CoinHeaderBg src="/img/app_wallet/rectangle-wallet.svg" />
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
    openPanelRight: (data) => {
      dispatch(openPanelRight(data));
    }, 
    togglePanelLeft: () => {
      dispatch(togglePanelLeft());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Coins);
