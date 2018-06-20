import React from "react";
import styled from "styled-components";
import style from "Shared/style-variables";

// CONSTANTS
import { ENABLEDCOINS } from "Config/constants";

// LIBS
import { WalletClass } from "Classes/Wallet";
import { encrypt } from "../../../utils/crypt";

// REDUX
import { connect } from "react-redux";
import { setWalletInfo, setBalance } from "Redux/actions";

// COMPONENTS
import { Col, H1, H2 } from "Components";
import { P } from "Components/P";
import { ButtonGreen, ButtonDisabled } from "Components/Buttons";

const Content = styled.div``;

const Input = styled.input`
  border: 1px solid ${style.lightPurple};
  background-color: ${style.defaultPurple};
  border-radius: 6px;
  color: ${style.normalGreen};
  font-size: 1.6rem;
  text-align: center;
  margin: 25px 0;
  padding: 20px;
  resize: none;
  width: 100%;
`;

const LabelCoin= styled.label` 
  font-weight: bold,
  font-family: roboto
`;

const Row = styled.div`
  text-align: center;
`;

const Wallet = new WalletClass();

class Rescue extends React.Component {
	constructor() {
    super();

    // ENABLE COINS 
		this.state = {
			notification: null,
			walletInfo: {
				seed: null,
				addresses: {
          lns: null,
					btc: null,
					// LTC: null,
          // ETH: null,
          // NANO: null,
          // DASH: null
				}
			}
		}
	}

  getAddress(seed) {
    if (seed.split(" ").length >= 12) {      
      try {
        let walletInfo = {};
        ENABLEDCOINS.map( coin => {
          let address = Wallet.getNewAddress(seed, coin.coinKey);
          walletInfo = {
            seed: seed,
            addresses: {
            ...walletInfo.addresses,
              [coin.coinKey]: address
            }
          }
        });
        
        this.setState({
          ...this.state,
          walletInfo,
          notification: null
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
      let walletInfo = {
        seed: this.state.walletInfo.seed,
        addresses: this.state.walletInfo.addresses
      };

      this.props.setWalletInfo(walletInfo.addresses);
      localStorage.setItem("WALLET-INFO", encrypt(JSON.stringify(walletInfo)));
      return this.setState({ ...this.state, notification: 'Sucesso'  });

    } catch (error) {
      console.error(error);
      return this.setState({ ...this.state, notification: error });
    }
	}
	
	randomSeed() {
    const mnemonic = Wallet.getMnemonic();
    return this.getAddress(mnemonic);
	}
	
	renderImport() {
    let err = 0;

    ENABLEDCOINS.map( coin => {
      if (!this.state.walletInfo.addresses || !this.state.walletInfo.addresses[coin.coinKey]) err += 1;
    });

    if (err === 0) {
      return (
        <ButtonGreen margin={"1.0rem auto"} width={"130px"} to="/app/home" onClick={() => { this.setSeed() }}>
          IMPORT
        </ButtonGreen>
      );
    } else {
      return <ButtonDisabled margin={"1.0rem auto"} padding={"1.0rem"} width={"130px"}>IMPORT</ButtonDisabled>;
    }
  }

	render() {
		return (
			<Content>
				<H1 fontSize={"1.6rem"} txBold clWhite>
					Enter your seedwords
				</H1>
				<Input onChange={(seed) => { this.getAddress(seed.target.value) }} placeholder="Ex: fantasy deliver afford disorder primary protect garbage they defense paddle alert reveal various just dish" />
				<Row>
					<P txBold style={ this.state.notification ? { display: 'block' } : { display : 'none' } } fontSize={"1.6rem"} margin={"1.8rem 0 0 0"} clWhite>
						{ this.state.notification }
					</P>
					{
						ENABLEDCOINS.map( coin => {
							return (
								<P fontSize={"1.4rem"} clWhite>
									<b> { this.state.walletInfo.addresses ? this.state.walletInfo.addresses[coin.coinKey] ? coin.coinName.toUpperCase() + ': ' : '' : ''} </b>
									{ this.state.walletInfo.addresses ? this.state.walletInfo.addresses[coin.coinKey] ? this.state.walletInfo.addresses[coin.coinKey] : '' : '' }
								</P>
							)
						})
					}
					{ this.renderImport() }
				</Row>
			</Content>
		);
	}
}

// REDUX
const mapStateToProps = state => ({
	walletInfo: state.walletInfo,
});

const mapDispatchToProps = dispatch => ({

	setWalletInfo: data => {
		dispatch(setWalletInfo(data));
	},

	setBalance: data => {
		dispatch(setBalance(data));
	}
});


export default connect(mapStateToProps, mapDispatchToProps)(Rescue);
