import styled from 'styled-components';
import style from 'Shared/style-variables';

export let Form = styled.form`
	${props => props.margin ? 'margin: '+props.margin : '' }
	${props => props.width ? 'width: '+props.width : ''}
`;