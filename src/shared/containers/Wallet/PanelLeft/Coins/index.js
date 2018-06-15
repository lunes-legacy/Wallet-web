import React       from "react";
import styled      from "styled-components";
import style       from "Shared/style-variables";
import { TextBase, H1 } from "Components";

// UTILS
import { decrypt } from "Utils/crypt";

//REDUX
import { connect } from "react-redux";
import { openPanelRight, togglePanelLeft, setTxHistory, setWalletInfo } from 'Redux/actions';

import { Loading } from 'Components/Loading';

import {numeral} from 'Utils/numeral';

const StyledCoins = styled.div`
  width: auto;
  min-width: 100%;
  height: 100vh;
  max-height: 100vh;

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
background-image: url('/img/app_wallet/rectangle-wallet.svg');
background-repeat: no-repeat;
letter-spacing: 1.3px;
display: flex;


@media (${style.media.mobile}) {
  font-size: 1.2rem;
  padding-top: 1.4rem;
  padding-left: 2rem;
  padding-right: 2rem;
  //background-size: 110% 100%;
  background-size: cover;
  background-position: -5px -5px;
  height: 70px;
}

@media (${style.media.tablet}) {
  font-size: 1.5rem;
  padding-top: 2.3rem;
  padding-left: 2.5rem;
  height: 90px;
}

@media (${style.media.laptop}) {
  background-size: cover;
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

  componentDidMount() {
    this.getWalletInfo();
  }

  getWalletInfo() {
		let walletInfo = JSON.parse(decrypt(localStorage.getItem('WALLET-INFO')));
		if (walletInfo) {
			this.props.setWalletInfo(walletInfo.addresses);
		}
	}

  //metodo chamado sempre que o componente é renderizado ou um
  //estado é atualizado
  _renderCoins = () => {
    let { currentNetwork }     = this.props.component.wallet;
    let { crypto, currencies } = this.props.currencies;
    let { balance }            = this.props

    if (!balance || !crypto || !currencies) {
      return <Loading />;
    }
    
    let components = [];
    // EX: coinKey = 'btc';
    for (let coinKey in balance) {
      let { crypto }  = this.props.currencies;
      let usdCurrent = crypto[coinKey].USD
      let coinAmount = this.props.balance[coinKey].total_confirmed;
      let coinBalance = numeral(coinAmount).format('0,0.000');
      let usdBalance = numeral(coinAmount * usdCurrent).format('0,0.000');

      let tmp = (
        <Coin
          key={coinKey}
          onClick={() => {
            this.props.openPanelRight({currentNetwork: coinKey.toLowerCase()}); 
            this.props.togglePanelLeft();
            this.props.setTxHistory({ network: coinKey.toUpperCase(), address: this.props.walletInfo.addresses[coinKey.toUpperCase()] });
          }}
        >
          <WrapCoinImg>
            <CoinImg src={`/img/coins/${coinKey.toLowerCase()}.svg`} />
          </WrapCoinImg>
          <WrapCoinData>
            <CoinAmount clWhite offSide size={"2.5rem"}>
              { coinKey } 
              { coinBalance }
            </CoinAmount>
            <CoinValue clWhite offSide size={"2rem"}>
              { "USD " + usdBalance }
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
    balance: state.balance,
    component:  state.component,
    currencies: state.currencies,
    walletInfo: state.walletInfo,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openPanelRight: (data) => {
      dispatch(openPanelRight(data));
    }, 
    togglePanelLeft: () => {
      dispatch(togglePanelLeft());
    },
    setWalletInfo: (data) => {
      dispatch(setWalletInfo(data));
    },
    setTxHistory: (data) => {
      dispatch(setTxHistory(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Coins);
