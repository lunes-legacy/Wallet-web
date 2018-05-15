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
  background: ${style.normalLilac};
  border-radius: 10px;
  padding: 3rem;
  @media (min-width: 601px) {
    width: 25%;
    height: 40%;
    margin-top: 75px;
  }
`;

export let ReceiveButtonCss = styled.div`
  height: 25rem;
  width: 25rem;
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
