import React from 'react';
import styled from 'styled-components';
import style from 'Shared/style-variables';

//COMPONENTS
import { H1 }    from 'Components/H1';
import { Img } from "Components/Img";

const Container = styled.div`
	text-align: center;
	padding: 0 50px;
`;

const Rectangle = styled.div`
	display: inline-block;
	margin: 20px;
	width: 299px;
	height: 384px;
	border-radius: 10px;
	background-color: #442181;
`;

class Home extends React.Component {
	render() {
		return (
			<Container>

				<Rectangle>
				</Rectangle>

				<Rectangle>
				</Rectangle>

				<Rectangle>
				</Rectangle>

				<Rectangle>
				</Rectangle>

				<Rectangle>
				</Rectangle>

				<Rectangle>
				</Rectangle>

			</Container>
		);
	}
}

export default Home;