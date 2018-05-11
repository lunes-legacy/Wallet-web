import styled from 'styled-components';
import style from 'Shared/style-variables';

let StyledRadio = styled.div`
	width: 2.5rem;
	height: 2.5rem;
	border-radius: 100%;
	border: 0.5rem solid ${style.lightLilac};
	background: transparent;
	cursor: pointer;
	position: relative;
	${props => {
		if (props.small) 
		  	return `
		  		width: 1.5rem; height: 1.5rem; border-width: 0.3rem;
		  		& .js-radio-circle {
		  			width: 0.9rem; height: 0.9rem;
		  		}
		  	`;
		if (props.normal) 
			return `
		  		width: 2rem; height: 2rem; border-width: 0.4rem;
		  		& .js-radio-circle {
		  			width: 1.2rem; height: 1.2rem;
		  		}
		  	`;
		if (props.big) 
			return `
		  		width: 2.5rem; height: 2.5rem; border-width: 0.5rem;
		  		& .js-radio-circle {
		  			width: 1.5rem; height: 1.5rem;
		  		}
		  	`;
		if (props.huge) 
			return `
		  		width: 3rem; height: 3rem; border-width: 0.6rem;
		  		& .js-radio-circle {
		  			width: 1.8rem; height: 1.8rem;
		  		}
		  	`;
	}}
`;

export default StyledRadio;