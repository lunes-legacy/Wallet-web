import React from "react";
import styled from 'styled-components';

// Private components
import style from 'Shared/style-variables';

// TODO: passar rgba(114,92,152,0.2) para o style-variables.js
const PanelStyle = styled.div`
  background-color: rgba(114,92,152,0.2);
  height: 36rem;
  text-align: center;
  width: 100%
  margin-bottom: 5px;

  @media (${style.media.tablet2}) {
    width: calc(100% - 5px);
    margin-bottom: 0;
  }
`;

const ImgContainer = styled.div`
  text-align: center;
`;

const UserImg = styled.img`
  background-color: #ffd224;
  border: 2px solid #fff;
  border-radius: 50%;
  margin: 7rem auto 1rem auto;
  width: 130px;
`;

const BtnUpload = styled.button`
  background-color: transparent;
  border: 2px dotted ${style.normalGreen}
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: 100;
  height: 4rem;
  margin: 2rem auto;
  width: 65%;
`;

class PanelLeft extends React.Component {
  render() {
    return(
      <PanelStyle>
        <ImgContainer>
          <UserImg src="https://lunes.io/img/time/Lucas_Magno.png" />
        </ImgContainer>
        <BtnUpload>+ Upload Photo</BtnUpload>
      </PanelStyle>
    );
  }
}

export default PanelLeft;
