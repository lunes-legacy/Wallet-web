import React from 'react';
import styled from 'styled-components';
import style from 'Shared/style-variables';

import { decrypt } from "../../utils/crypt";

// REDUX
import { connect } from "react-redux";
import { setBalance, setCurrenciesPrice, setCryptoPrice } from "Redux/actions";

import PanelLeft from './PanelLeft';
import PanelRight from './PanelRight';
import ModalLeasing from "./modal/index";
import ModalConfirm from './modal/confirm';

let Panels = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
`;

class Leasing extends React.Component {
	constructor(props){
		super(props);
	}

	componentWillMount() {
    this.props.setCurrenciesPrice();
    this.props.setCryptoPrice();
  }

  componentDidMount() {
    this.props.setBalance({ addresses: this.getAddress() });
  }

  getAddress() {
		let walletInfo = JSON.parse(decrypt(localStorage.getItem("WALLET-INFO")));
		if (walletInfo) {
			return walletInfo.addresses;
		}
  }

	render() {
		return(
			<Panels>
				<PanelLeft />
				<PanelRight />
			</Panels>
		);
	}
}

const mapStateToProps = state => {
  return { };
};


const mapDispatchToProps = dispatch => {
  return {
    setCurrenciesPrice: () => {
      dispatch(setCurrenciesPrice());
    },
    setCryptoPrice: () => {
      dispatch(setCryptoPrice());
    },
    setBalance: data => {
      dispatch(setBalance(data));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Leasing);
