import React from "react";
import styled from "styled-components";
import style from "Shared/style-variables";

const PanelLeft = styled.aside`
	background: ${style.darkLilac};
	float: left;
  height: 100vh;
	padding-bottom: 50px;
	width: 100%;

	@media (${style.media.tablet2}) {
    width: 40%;
	}
`;

export default PanelLeft;
