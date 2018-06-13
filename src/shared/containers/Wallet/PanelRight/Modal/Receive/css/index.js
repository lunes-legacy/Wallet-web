import styled, { css } from "styled-components";
import { TextBase } from "Components/TextBase.js";
import BackgroundBase from "Components/bases/BackgroundBase.js";

export let ReceiveStyleModalCss = styled.div`
  width: 100%;
  height: calc(100% - 75px);
  min-width: 470px;
  min-height: 380px;
  position: relative;
  background: #3a1777;
  border-radius: 12px;
  padding: 3rem;
  @media (min-width: 601px) {
    width: 25%;
    height: 40%;
    margin-top: 75px;
  }
`;

export let ReceiveButtonQrCodeCss = styled.div`
  
  width: 19rem;
  height: 19rem;
  border-radius: 48px;
  display: flex;
  box-shadow: inset 0 1px 8px 0 #4b2c82;
  user-select: none;
  align-items: center; 
  justify-content: center;
  


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
  
  margin-top: 3%;
  color: #ffffff;
  font-size: 1.8rem;
  position: center;
`;

export let ReceiveLabelTextCss = styled.label`
  position: relative;
  margin-top: 5%;
  font-weight: bold;
  color: #4cd566;
  font-size: 1.8rem;
  position: center;
`;

export let ReceiveButtonModalCss = styled.div`
  
   width: 90px;
   height: 90px;
   background-color: #4cd566;
   border-radius: 60%;
   align-items: center;
   margin-top: 8%;
   margin-right: 5%;
   padding: 14px;
   
   &:hover {
    box-shadow: 0px 2px 30px 0px #4cd566;
    cursor: pointer;
  }
`;

export let IconAction = styled.img`
  
  margin-left: 0.6rem;
  margin-top: 1.6rem;
  width: 2.7rem;
  height: 3.0rem;
  min-width: 5.0rem;
  opacity: 0.5;

  &:hover {
    opacity: 1;
  }


  
  `;