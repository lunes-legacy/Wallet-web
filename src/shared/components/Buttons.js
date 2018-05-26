import React from 'react';
import styled from 'styled-components';
import style from 'Shared/style-variables';
import { ButtonBase } from './ButtonBase';

export let Button = styled.button`
	${ButtonBase}
`;
export let ButtonSecondary = Button.extend`
	background: transparent;
	border: 1.5px solid ${style.normalGreen};

	transition: background 0.2s;
	&:hover {
		background: ${style.normalGreen};
	}
`;

export let ButtonBackgroundGreen = Button.extend`
	background: ${style.normalGreen};
	border: 1.5px solid ${style.normalGreen};
`;