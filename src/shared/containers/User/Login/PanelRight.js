import React from "react";
import styled from "styled-components";

import variables from "Shared/style-variables";

export const PanelRight = styled.main`
	background: ${variables.normalLilac};
	display: none;
	float: left;
	height: 100vh;
	width: 60%;

	@media only screen and (min-width: 768px) {
		display: block;
	}
`;

export default PanelRight;
