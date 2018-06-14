import React from "react";
import styled from "styled-components";
import style from "Shared/style-variables";
//CONTANTS
import { TESTNET } from 'Config/constants';

// LIBS
import { services, networks } from 'lunes-lib';
import { encrypt } from '../../../utils/crypt'

// REDUX
import { connect } from 'react-redux';
import { setWalletInfo } from 'Redux/actions';

//COMPONENTS
import { Logo } from "Components/Logo";
import { Form } from "Components/Form";
import { FormGroup } from "Components/FormGroup";
import { Textarea } from "Components/Input";
import { P } from "Components/P";
import { ButtonGreen, ButtonSecondary,ButtonDisabled } from "Components/Buttons";

//PRIVATE COMPONENTS
import PanelLeft from "./PanelLeft";
import PanelRight from "./PanelRight";
import Slide from "../../../containers/User/Login/Slide";

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
class Import extends React.Component {
  constructor(){
		super();
		this.state = {
      notification: null,
			walletInfo: {
				seed: null,
				addresses: {
					LNS: null
				}
			}
		}
  }
  
  componentDidMount() {
    let accessToken = localStorage.getItem('ACCESS-TOKEN');
    if (!accessToken) {
      return this.props.history.push('/');
    }
  }

  getAddress(seed) {
		try {
			if (seed.split(" ").length >= 12) {
        let address;
        if (TESTNET === true)
  				address = services.wallet.lns.wallet.newAddress(seed, networks.LNSTESTNET);
        else
          address = services.wallet.lns.wallet.newAddress(seed, networks.LNS);

				this.setState({ ...this.state, walletInfo: { seed: seed, addresses: { LNS: address } }, notification: null })
			} else {
				this.setState({ ...this.state, walletInfo: { seed: seed, addresses: { LNS: 'Mínimo 12 palavras' } }, notification: null })
			}
		} catch (error) {
			this.setState({ ...this.state, walletInfo: { seed: seed, addresses: { LNS: 'Palavras inválidas' } }, notification: null })
			console.log(error);
		}
	}

  setSeed() {
		try {
			let walletInfo = {
				seed: this.state.walletInfo.seed,
				addresses: {
					LNS: this.state.walletInfo.addresses.LNS
				}
      }
      
      localStorage.setItem('WALLET-INFO', encrypt(JSON.stringify(walletInfo)));
      return this.props.history.push('/app/home');
      
		} catch (error) {
			this.setState({ ...this.state, notification: error })
			console.log(error)
		}

  }
  
  randomSeed(){
    const mnemonic = services.wallet.mnemonic.generateMnemonic();
    return this.getAddress(mnemonic);
  }

  renderImport() {
		if (this.state.walletInfo.addresses.LNS && this.state.walletInfo.addresses.LNS.charAt(0) === '3') {
			return (
				<ButtonGreen margin={"1.0rem auto"} to="/app/home" onClick={ () => { this.setSeed() } }>IMPORTAR</ButtonGreen>
			);
		} else {
			return (
				<ButtonDisabled margin={"1.0rem auto"}>IMPORTAR</ButtonDisabled>
			)
		}
	}

  render() {
    return (
      <div>
        <PanelLeft>
          <CustomLogo />
          <Form margin={"10% auto"} width={"80%"}>
            <FormGroup>
              <Row>
                <P fontSize={"1.4rem"} margin={"0 0 1.0rem 0"} clWhite>If you already generated your seed, then insert below</P>
                <P fontSize={"1.4rem"} margin={"0 0 1.0rem 0"} clWhite>If it's your first time, then generate the seed</P>
                <P fontSize={"1.9rem"} margin={"4.0rem 0 1.0rem 0"} txBold clNormalGreen>Insert your seedwords</P>
              </Row>
              <Textarea type={"textarea"} value={this.state.walletInfo.seed ? this.state.walletInfo.seed : ""} onChange={ (seed) => { this.getAddress(seed.target.value) } } required />
            </FormGroup>
            </Form>
            <ButtonsRow>
              <ButtonSecondary onClick={ () => { this.randomSeed() } }>
                GERAR NOVA SEED
              </ButtonSecondary>
              { this.renderImport() }
            </ButtonsRow>
          <Row>
            <P fontSize={"1.4rem"} margin={"3.0rem 0 1.0rem 0"} clWhite>
              Address
            </P>
            <P fontSize={"1.4rem"} clWhite>
            { this.state.walletInfo.addresses.LNS }
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


export default connect(mapStateToProps, mapDispatchToProps)(Import);
