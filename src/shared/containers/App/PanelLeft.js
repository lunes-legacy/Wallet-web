import React from 'react';
import styled from 'styled-components';
import styles from 'Shared/style-variables';

const PanelLeft = styled.div`
	width: 100%;
	min-width: auto;
	height: 50px;
	display: flex;
	justify-content: center;
	align-items: center;
	background: ${styles.normalLilac2};
	z-index: 3;


	@media (min-width: 768px) {
		display: block;
		width: 160px;
		min-width: 160px;
		height: 100%;
	}
`;

export default PanelLeft;