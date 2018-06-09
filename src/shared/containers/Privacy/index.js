import React from "react";
import styled from "styled-components";

// REDUX
import { connect } from 'react-redux';
import { getWalletInfo } from 'Redux/actions';

//COMPONENTS
import TabsBuilder from "Components/Tabs";

// PAGE
import Backup from "./Backup/backup";
import Rescue from "./Rescue/rescue";

const Container = styled.div`
  padding: 50px 100px;
  width: 90%;
`;

const tabTitle = [
	'Backup de Segurança',
	'Resgate'
]

class Privacy extends React.Component {
	componentDidMount() {
		this.props.getWalletInfo()
		console.log(this.props.walletInfo)
	}

  render() {
    return (
      <Container>
        <TabsBuilder tabTitle={tabTitle} tabContent={[<Backup/>, <Rescue/>]}/>
      </Container>
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
    getWalletInfo: (data) => {
      dispatch(getWalletInfo(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Privacy);

