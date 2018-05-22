import styled, { keyframes } from 'styled-components';
import style from 'Shared/style-variables';

let rotationLoading = keyframes`
	from { transform: rotate(0deg);	}
	to { transform: rotate(360deg);	}
`;
export let Loading = styled.div`
	border: 10px solid ${style.normalGreen};
	border-left-color: transparent;
	border-radius: 100%;
	animation: ${rotationLoading} 1s linear infinite;
	width: 75px;
	height: 75px;
  margin: 0 auto;
`;
