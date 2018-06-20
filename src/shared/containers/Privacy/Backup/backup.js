import React from "react";
import styled from "styled-components";
import style from "Shared/style-variables";

// UTILS
import { decrypt } from '../../../utils/crypt'

// REDUX
import { connect } from 'react-redux';
import { setWalletInfo } from 'Redux/actions';

// COMPONENTS
import CoinsAddress from "./coinsAddress";
import { H1 } from "Components/H1";

const Line = styled.div`
  border-bottom: 1px dotted ${style.lightPurple};
  margin: 30px 0;
  width: 100%;
`;

const Content = styled.div`
  padding-left: 10px;
`;

const Phrase = styled.div`
`;

const Addresses = styled.div`
  margin-bottom: 60px;
`;

const Input = styled.input`
  border: 1px solid ${style.lightPurple};
  background-color: ${style.defaultPurple};
  border-radius: 6px;
  color: ${style.normalGreen};
	font-size: 1.6rem;
	text-align: center;
  margin: 25px 0 0 0;
  padding: 20px;
  width: 100%;
`;

class Backup extends React.Component {
	constructor() {
		super();
		this.state = {
			seed: ''
		}
	}
	
	componentDidMount() {
		this.getWalletInfo();
	}
	
	getWalletInfo() {
		let walletInfo = JSON.parse(decrypt(localStorage.getItem('WALLET-INFO')));
		if (walletInfo) {
			this.props.setWalletInfo(walletInfo.addresses);
			this.setState({ seed: walletInfo.seed });
		}
	}

	render() {
		return (
      <div>
				<Phrase>
					<H1 fontSize={"1.6rem"} txBold clWhite>
						Safety phrase
					</H1>
					<Input
						disabled
						type="text"
						value={ this.state.seed ? this.state.seed : "" }
						placeholder={ this.state.seed ? "" : "Loading..."}
					/>
				</Phrase>
		
				<Line />
		
				<Addresses>
					<H1 fontSize={"1.6rem"} txBold clWhite>
						Wallet addresses
					</H1>
					<CoinsAddress walletInfo={ this.state.walletInfo } />
				</Addresses>
			</div>
		);
	}
}

// REDUX
const mapStateToProps = state => {
  return {
    walletInfo: state.walletInfo,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setWalletInfo: (data) => {
      dispatch(setWalletInfo(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Backup);
