import styled from 'styled-components';
import style from 'Shared/style-variables';
import { TextBase } from "Components";



export let Background = styled.div`
	position: fixed;
	top: 0px;
	left: 0px;
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: flex-end;
	background: ${style.rgba(style.darkLilac, 0.8)};
	z-index: 1000;
	@media (min-width: 601px) {
		align-items: center;
	}
	& * {
		overflow: visible;
	}
`;

export let TextCenter = styled.div`
	${TextBase};
	font-size: 12px;
	font-weight: bold;
	text-align: center;
`;

export let QuantityAmount = styled.div`
  ${TextBase};	
	font-size: 12px;
  font-weight: 300;
	color: #4cd566;
	text-align: center;
	
  @media (${style.media.mobile2}) {
    font-size: 4rem;
    margin-top: 1rem;
  }
`;

export let LeasingStyleModalCss = styled.div`
	position: relative;	
  background-color: #442181;
	box-shadow: 19px 1px 22px 0 rgba(0, 0, 0, 0.09);

  min-width: 583px;
  min-height: 506px; 
  border-radius: 10px;
	padding: 3rem;

  @media (min-width: 601px) {
    width: 25%;
    height: 40%;
    margin-top: 75px;
  }
`;

export let Close = styled.div`
	position: absolute;
	right: 10px;
	top: 10px;
	font-size: 2rem;
	color: white;
	cursor: pointer;
	font-weight: bold;
`;

export let ReceiveContentCss = styled.div`
  overflow: auto;
  margin: 12px 0 0 0;
  max-height: calc(100% - 75px);
  overflow: auto;
`;

export let Rectangle = styled.div`
	width: 323px;
  height: 94px;
  border-radius: 6px;
	border: solid 1px #4cd566;
	margin-top: 20px
	padding-top: 10px;
	padding-right: 20px;
	padding-bottom:  20px;
	padding-left: 20px;
	margin-bottom: 40px;
`;

export let Image = styled.img`
	width: 41px;
	height: 34px;
	text-align: left
`;

export let CoinValue = styled.div`
	width: 220px;
	height: 55px;
	font-family: Offside;
	font-size: 29px;
	color: white;
	text-align: right;
`;

export let NumberPorcent = styled.div`
	${TextBase};
	font-weight: 300;
	float: left;
	${props => {
		if (props.marginRight)
			return `margin-right ${props.marginRight}`;

		else if (props.left)
			return "text-align: left";

		else if (props.center)
			return "text-align: center";
	}}
`;

export let Line = styled.hr`
	margin-top: 20px;
	border: 0.7px solid #654fa4;
`;

export let DivNumber = styled.div`
	margin: 0 auto;
	width: 62%; 
`;

export let DivButton = styled.div`
 margin-top: 30px;
 width: 241px;
  
`;