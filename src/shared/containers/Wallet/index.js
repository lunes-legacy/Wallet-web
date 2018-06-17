import React from "react";
import styled from "styled-components";

//REDUX
import { connect } from "react-redux";
import { togglePanelLeft, setBalance, setCryptoPrice, setCurrenciesPrice } from "Redux/actions";

//COMPONENTS
import PanelLeft from "./PanelLeft/index";
import PanelRight from "./PanelRight/index";

//______INDEX
let Panels = styled.div`
  width: 100%;
  display: flex;
`;

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      balance: undefined,
      myCoins: undefined,
      coinsPrice: undefined
    };
  }

  componentWillMount() {
    this.props.setBalance({ addresses: this.props.walletInfo.addresses });
    this.props.setCurrenciesPrice();
    this.props.setCryptoPrice();
  }

  componentDidMount = async () => {
    this.props.setCurrenciesPrice();
    this.props.setCryptoPrice();
  };

  render() {
    return (
      <Panels>
        <PanelLeft />

        <PanelRight />
      </Panels>
    );
  }
}

const mapStateToProps = state => {
  return {
    wallet: state.wallet,
    balance: state.balance,
    walletInfo: state.walletInfo,
    currencies: state.currencies,
    cryptoPrice: state.currencies.crypto,
    currenciePrice: state.currencies.currencies
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setBalance: data => {
      dispatch(setBalance(data));
    },
    setCryptoPrice: () => {
      dispatch(setCryptoPrice());
    },
    setCurrenciesPrice: () => {
      dispatch(setCurrenciesPrice());
    },
    togglePanelLeft: () => {
      dispatch(togglePanelLeft());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Wallet);
