import React from "react";
import styled from "styled-components";
import style from "Shared/style-variables";
import CoinGraph from "./CoinGraph";

// REDUX
import { connect } from "react-redux";

//COMPONENTS
import { TextBase } from "Components/TextBase";
import { Col, Row } from 'Components/index';

import {numeral} from 'Utils/numeral';

const StyledCoinStatus = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${style.normalLilac3};
  padding: 1.5rem 1rem;
`;

const CoinDetailsText = styled.div`
  ${TextBase}
  width: 100%;
  font-size: 2.3rem;
  color: white;
  text-align: left;
  font-weight: 300;
  @media (${style.media.laptop}) {
    font-size: 	3.0rem;
  }
`;


const CoinDetails = styled.div`
  margin-top: 3rem;
  padding-left: 1rem;

  @media (${style.media.mobile2}) {
    margin-top: 2rem;
    padding-left: 2rem;
  }

  @media (${style.media.tablet2}) {
    padding-left: 3rem;
  }

  @media (${style.media.laptop}) {
    text-align: center;
  }
`;

const GraphContainer = styled.div`
  padding: 1rem 0;
`;

class CoinStatus extends React.Component {
  constructor(props) {
    super(props);

    numeral.locale(this.props.currencies.locale);
    this.state = {
      coin_porcentage_price: []
    };
  }

  render() {
    let { currentNetwork }      = this.props.wallet;
    let { crypto, currencies }  = this.props.currencies;
    let { balance }             = this.props;

    let coinSymbol    = currentNetwork === 'lns' ? 'LUNES' : currentNetwork.toUpperCase();
    let coinName      = balance[currentNetwork.toUpperCase()].coinName;
    let currentCurrencie = numeral(crypto[currentNetwork.toUpperCase()].USD).format('$0,0.00');
    let usdBalance    = numeral(balance[currentNetwork.toUpperCase()].total_confirmed * crypto[currentNetwork.toUpperCase()].USD).format('$0,0.00');

    if (!crypto || !currencies) {
      return null;
    }

    return (
      <StyledCoinStatus>
        <Row>
          <Col s={12} m={3} l={3}>
            <CoinDetails>
              <CoinDetailsText offSide>{ coinName }</CoinDetailsText>
              <CoinDetailsText >{ '1 ' + coinSymbol } { currentCurrencie }</CoinDetailsText>
            </CoinDetails>
          </Col>
          <Col s={8} m={6} l={7}>
            <GraphContainer>
              <CoinGraph />
            </GraphContainer>
          </Col>

        </Row>
      </StyledCoinStatus>
    );
  }
}

const mapStateToProps = state => {
  return {
    wallet: state.component.wallet,
    currencies: state.currencies,
    balance:    state.balance
  };
};
const mapDispatchToProps = dispatch => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(CoinStatus);
