import styled, { css } from "styled-components";
import style from "Shared/style-variables";
import { TextBase } from "Components/TextBase.js";
import BackgroundBase from "Components/bases/BackgroundBase.js";

export let ReceiveStyleModalCss = styled.div`
  width: 100%;
  height: calc(100% - 75px);
  min-width: 320px;
  min-height: 414px;
  position: relative;
  background: #3a1777;
  border-radius: 10px;
  padding: 3rem;
  @media (min-width: 601px) {
    width: 25%;
    height: 40%;
    margin-top: 75px;
  }
`;

export let ReceiveButtonQrCodeCss = styled.div`
  height: 20rem;
  width: 20rem;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  user-select: none;

  ${TextBase};
  ${BackgroundBase};
  ${props => {
    if (props.blockCenter) return `margin: 0 auto;`;
  }} ${props => (props.css ? props.css : "")};
`;

export let ReceiveContentCss = styled.div`
  overflow: auto;
  margin: 12px 0 0 0;
  max-height: calc(100% - 75px);
  overflow: auto;
`;

export let FirstRowCss = css`
  margin-top: 3rem;
  margin-bottom: 3rem;
`;
export let ThirdRowCss = css`
  padding: 25px 0 25px 0;
`;

export let ReceiveLabelCss = styled.label`
  position: relative;
  top: 10px;
  color: #fff;
  font-size: 12pt;
  position: center;
`;

export let ReceiveLabelTextCss = styled.label`
  position: relative;
  top: 10px;
  font-weight: bold;
  color: #4cd566;
  font-size: 14pt;
  position: center;
`;

export let ReceiveButtonModalCss = styled.div`
  width: 80px;
  height: 80px;
  background-color: #f7931a;
  border-radius: 60%;
  align-items: center;
  margin-top: 19%;
  margin-right: 10px;
  padding: 14px;
`;

export let IconAction = styled.img`
  margin-top: 6px;
  width: 40px;
  height: 40px;
  min-width: 50px;
  position: center;
`;
