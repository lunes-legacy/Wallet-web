import React from "react";
import styled from "styled-components";
import style from "Shared/style-variables";

const PanelLeft = styled.aside`
<<<<<<< HEAD
	background: ${style.darkLilac};
	float: left;
	width: 100%;
	height: 100vh;
	overflow: auto;
	padding-bottom: 50px;

	@media only screen and (min-width: 768px) {
		width: 40%;
	}
=======
  background: ${style.darkLilac};
  float: left;
  width: 40%;
  height: 100vh;
  overflow: auto;
  padding: 0 0 50px 0;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
>>>>>>> origin/login-wallet-web
`;

export default PanelLeft;
