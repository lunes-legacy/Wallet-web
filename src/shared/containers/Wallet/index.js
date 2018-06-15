import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import UserClass from "Classes/User";

//REDUX
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
    // let Cookies = new CookieClass;
    let User = new UserClass();
    // let user;
    // let cookie = Cookies.get('user');
    //  try {
    //  	if (!cookie)
    //  		throw errorPattern('WALLET ERROR',500,'WALELT ERROR');
    //  	user = JSON.parse(cookie.user.toString());
    //  } catch(err) {
    //  	try {
    // user    = await User.login();
    //  	} catch(err2) {
    //  		throw errorPattern('An error ocurred on trying to do the login', 500, 'CONTAINERS_WALLET_ERROR', err2);
    //  	}
    //  }
    let user = await User.login({ email: "", password: "" });
    if (!user) {
      return;
    }

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
    setCryptoPrice: data => {
      dispatch(setCryptoPrice(data));
    },
    setCurrenciesPrice: data => {
      dispatch(setCurrenciesPrice(data));
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
