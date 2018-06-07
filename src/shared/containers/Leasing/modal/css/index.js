import styled from 'styled-components';
import style from 'Shared/style-variables';


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
	font-size: 12px;
	font-weight: bold;
	text-align: center;
	color: #ffffff;
`;

export let Amount = styled.div`
  
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
  width: 1223px;
  height: 863px;
  background-color: #4b2c82;
	box-shadow: 19px 1px 22px 0 rgba(0, 0, 0, 0.09);
	
	
  min-width: 320px;
  min-height: 414px;
  position: relative;
  background: #3a1777;
  border-radius: 10px;
	padding: 3rem;
  border-radius: 10px;
	background-color: #442181;	

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
	width: 363px;
  height: 114px;
  border-radius: 6px;
  border: solid 1px #4cd566;
`; 
