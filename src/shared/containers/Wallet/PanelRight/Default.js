import React from 'react';
import styled from 'styled-components';
import style from 'Shared/style-variables';

import { Col, Row, Img, H3 } from 'Components';

let StyledDefault = styled.div`
	width: 100%;
	height: 100%:
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Icon = Img.extend`
  margin: 40% auto 2rem auto;
  width: 5rem;

  @media(${style.media.tablet2}) {
    margin: 30% auto 2rem auto;
    width: 6rem;
  }

  @media(${style.media.laptop}) {
    width: 7rem;
  }
`;

const CustomH3 = H3.extend`
  color: #fff;
  font-weight: 500;
  margin: 1rem;
  text-align: center;
`;

class Default extends React.Component {
	render() {
		return (
			<StyledDefault>
				<Icon src={"/img/app_wallet/ic_default.svg"} />
        <CustomH3>Selecione uma carteira <br />em seu portfólio.</CustomH3>
			</StyledDefault>
		);
	}
}

export default Default;
