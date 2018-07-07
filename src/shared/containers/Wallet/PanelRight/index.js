import React from "react";
import style from "Shared/style-variables";
import styled from "styled-components";
import { connect } from "react-redux";

//COMPONENTS
import { TextBase, Text, ErrorBoundary } from 'Components';

//PRIVATE COMPONENTS
import Histories   from './Histories';
import CoinControl from './CoinControl';
import CoinStatus  from './CoinStatus';
import Default     from './Default';
// import ModalSend from "./Modal/Send/index";

const TextBold = Text.extend`
	${TextBase}
	font-weight: bold;
	display: inline-block;
`;

const StyledPanelRight = styled.div`
  position: relative;
  background: ${style.normalLilac};
  width: 100%;
  height: 100%;
  overflow-x: auto;
`;

class PanelRight extends React.Component {
  constructor(props) {
    super(props);
  }

  handleToggleHistory = event => {
    let historyEl = event.currentTarget.parentElement;
    let historyContentEl = historyEl.querySelector(":nth-child(2)");
    toggleScaleY({
      element: historyContentEl,
      visible: "1",
      hidden: "0"
    });
  };

  _shouldRender = () => {
    let { isPanelRightVisible } = this.props.component_wallet;
    if (!isPanelRightVisible) return false;
      return true;
  }

  render() {
    if (!this._shouldRender()) return <Default />;

    return (
      <StyledPanelRight>
        <CoinStatus />
        <CoinControl />
        <Histories />
      </StyledPanelRight>
    );
  }
}
const mapStateToProps = state => {
  return {
    component_wallet: state.component.wallet
  };
};
const mapDispatchToProps = dispatch => {
  return {};
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PanelRight);
