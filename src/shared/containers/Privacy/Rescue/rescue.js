import React from "react";
import styled from "styled-components";
import style from "Shared/style-variables";

// LIBS
import { services, networks } from 'lunes-lib';

// REDUX
import { connect } from 'react-redux';
import { setWalletInfo } from 'Redux/actions';

// COMPONENTS
import { Col, H1, H2 } from 'Components';
import { ButtonGreen, ButtonDisabled } from "Components/Buttons";


const Content = styled.div`
`;

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

const Row = styled.div`
  text-align: center;
`;

class Rescue extends React.Component {
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

	getAddress(seed) {
		try {
			if (seed.split(" ").length >= 12) {
				let address = services.wallet.lns.wallet.newAddress(seed, networks.LNS);
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
			if (this.state.walletInfo.seed) {
				this.props.setWalletInfo(walletInfo);
				localStorage.setItem('WALLET-INFO', JSON.stringify(walletInfo));	
				this.setState({ ...this.state, notification: 'Success' })
			} else {
				this.setState({ ...this.state, notification: 'Campo vazio' })
			}
		} catch (error) {
			this.setState({ ...this.state, notification: error })
			console.log(error)
		}

	}

	renderImport() {
		if (this.state.walletInfo.addresses.LNS && this.state.walletInfo.addresses.LNS.charAt(0) === '3') {
			return (
				<ButtonGreen width="130px" fontSize={'0.8rem'} onClick={ () => { this.setSeed() } }>IMPORTAR</ButtonGreen>
			);
		} else {
			return (
				<ButtonDisabled width="130px" fontSize={'0.8rem'}>IMPORTAR</ButtonDisabled>
			)
		}
	}

	renderMsg() {
		if (this.state.notification && this.state.notification === 'Success') {
			return (
				<H1 fontSize={"2.2rem"} margin={"2rem 0 0 0"} offSide clNormalGreen> Importado com sucesso! </H1>
			);
		} else if (this.state.notification && this.state.notification !== 'Success') {
			return (
				<H1 fontSize={"2.2rem"} margin={"2rem 0 0 0"} offSide clNormalRed> { this.state.notification } </H1>
			);
		}
	}

	render() {
		return (
			<Content>
				<H1 fontSize={"1.6rem"} txBold clWhite>
					Digite suas palavras
				</H1>
				<Input onChange={ (seed) => { this.getAddress(seed.target.value) } } placeholder="Ex: fantasy deliver afford disorder primary protect garbage they defense paddle alert reveal various just dish"/>
				<Row>
					<H2 fontSize={"1.6rem"} margin={"0 0 2.0rem 0"} padding={"1.0rem 0 0 0"} clWhite>
						{ this.state.walletInfo.addresses.LNS }
					</H2>
					{ this.renderImport() }
				</Row>
				<Row>
					{ this.renderMsg() }
				</Row>
			</Content>
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


export default connect(mapStateToProps, mapDispatchToProps)(Rescue);
