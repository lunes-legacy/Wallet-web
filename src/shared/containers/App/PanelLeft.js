import React from 'react';
import styled from 'styled-components';
import styles from 'Shared/style-variables';

import { Link } from 'react-router-dom';
import { TextBase } from 'Components/TextBase';

let CustomLink = styled.a`
	${TextBase}
`;

let PanelLeft = ({className, children}) => {
	return(
		<div className={className}>
			<CustomLink to={"/app/home"}>Home</CustomLink>
			<CustomLink to={"/app/wallet"}>Wallet</CustomLink>
		</div>		
	);
}
export default styled(PanelLeft)`
	width: 160px;
	min-width: 160px;
	height: 100%;
	display: block;
	background: ${styles.normalLilac2};
	z-index: 3;
`
// export default PanelLeft;