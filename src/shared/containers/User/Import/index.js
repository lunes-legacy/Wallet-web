import React from "react";
import styled from "styled-components";

// LIBS
import { WalletClass } from "Classes/Wallet";
import { encrypt } from "../../../utils/crypt";

// REDUX
import { connect } from "react-redux";
import { setWalletInfo } from "Redux/actions";

//COMPONENTS
import { Logo } from "Components/Logo";
import { Form } from "Components/Form";
import { FormGroup } from "Components/FormGroup";
import { Textarea } from "Components/Input";
import { P } from "Components/P";
import { ButtonGreen, ButtonSecondary, ButtonDisabled } from "Components/Buttons";

//PRIVATE COMPONENTS
import PanelLeft from "./PanelLeft";
import PanelRight from "./PanelRight";
import Slide from "../../../containers/User/Login/Slide";

// CONSTANTS
import { ENABLEDCOINS } from "Config/constants";

const CustomLogo = Logo.extend`
  margin: 40px auto 0 auto;
`;

const Row = styled.div`
  text-align: center;
`;

const ButtonsRow = styled.div`
  margin: 0 auto;
  width: 50%;
`;

const Wallet = new WalletClass();

class Import extends React.Component {

  // ENABLE COINS
  constructor() {
    super();
    this.state = {
      notification: null,
      walletInfo: {
        seed: null,
        addresses: {
          lns: null,
          btc: null,
          eth: null,
          ltc: null,
          // nano: null,
          dash: null
        }
      }
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("ACCESS-TOKEN");
    if (!accessToken) {
      return this.props.history.push("/");
    }
  }

  getAddress(seed) {
    if (seed.split(" ").length >= 12) {
      try {
        this.setState({
          ...this.state,
          walletInfo: { seed: seed },
          notification: true
        });

        return;
        } catch (error) {
          console.log(error);
          this.setState({
            ...this.state,
            walletInfo: { seed: seed, adresses: {} },
            notification: "Invalid Words"
          });
      }
    } else {
      this.setState({
        ...this.state,
          walletInfo: { seed: seed, adresses: {} },
          notification: "Min. 12 words"
      });
    }
  }

  setSeed() {
    try {
      let err = 0;
      let seed = this.state.walletInfo.seed;
      let walletInfo = {};

      ENABLEDCOINS.map( coin => {
        try {
          let address = Wallet.getNewAddress(seed, coin.coinKey);
          walletInfo = {
            seed: seed,
            addresses: {
            ...walletInfo.addresses,
              [coin.coinKey]: address
            }
          }
        } catch (error) {
          err += 1;
          return this.setState({ ...this.state, loading: false, notification: error.message, walletInfo: { seed: null, addresses: {} } });
        }
      });

      if (err === 0) {
        this.props.setWalletInfo(walletInfo.addresses);
        localStorage.setItem("WALLET-INFO", encrypt(JSON.stringify(walletInfo)));
        return this.props.history.push("/app/home");
      }

      return this.setState({ ...this.state, loading: false, notification: 'Invalid Words', walletInfo: { seed: null, addresses: {} } });
    } catch (error) {
      this.setState({ ...this.state, notification: error });
      console.log(error);
      return error;
    }
	}

  randomSeed() {
    const mnemonic = Wallet.getMnemonic();
    return this.getAddress(mnemonic);
  }

  renderImport() {
    let err = 0;

    if (this.state.notification !== true)  err += 1;

    if (err === 0) {
      return (
        <ButtonGreen
          margin={"1.0rem auto"}
          to="/app/home"
          onClick={() => {
            this.setSeed();
          }}
        >
          IMPORT SEEDWORDS
        </ButtonGreen>
      );
    } else {
      return <ButtonDisabled margin={"1.0rem auto"}>IMPORT SEEDWORDS</ButtonDisabled>;
    }
  }

  render() {
    return (
      <div>
        <PanelLeft>
          <CustomLogo />
          <Form margin={"10% auto 0 auto"} width={"80%"}>
            <FormGroup>
              <Row>
                <P fontSize={"1.4rem"} margin={"0 0 1.0rem 0"} clWhite>
                  If you already generated your seed, then insert it below
                </P>
                <P fontSize={"1.4rem"} margin={"0 0 1.0rem 0"} clWhite>
                  If you do not have a seed to import, then generate the seed
                </P>
                <P fontSize={"1.9rem"} margin={"4.0rem 0 1.0rem 0"} txBold clNormalGreen>
                  Insert your seedwords
                </P>
              </Row>
              <Textarea
                type={"textarea"}
                value={this.state.walletInfo.seed ? this.state.walletInfo.seed : ""}
                onChange={seed => {
                  this.getAddress(seed.target.value);
                }}
                required
              />
            </FormGroup>
          </Form>
          <ButtonsRow>
            <ButtonSecondary
              onClick={() => {
                this.randomSeed();
              }}
            >
              GENERATE NEW SEEDWORD
            </ButtonSecondary>
            { this.renderImport() }
          </ButtonsRow>
          <Row>
            <P txBold style={ this.state.notification ? { display: 'block' } : { display : 'none' } } fontSize={"1.6rem"} margin={"3.0rem 0 0 0"} clWhite>
              { this.state.notification }
            </P>
          </Row>
        </PanelLeft>

        <PanelRight>
          <Slide />
        </PanelRight>
      </div>
    );
  }
}

// REDUX
const mapStateToProps = state => {
  return {
    walletInfo: state.walletInfo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setWalletInfo: data => {
      dispatch(setWalletInfo(data));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Import);
