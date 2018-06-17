import React from "react";
import Image from "../../../components/Image";
import styled from "styled-components";

let Container = styled.div`
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-top: 15%;

    @media screen {
      margin-left: 20%;
    }
`;


let images = [
  {
    link: "/img/user_panel_right/img-slide1.jpg",
    text: `Discover the first multiservice wallet in the world and keep your cryptocurrencies safe. We offer an innovative and intelligent financial ecosystem with unique features and modern design.` 
  },
  {
    link: "/img/user_panel_right/img-slide2.jpg",
    text: `The Lunes wallet is developed with a focus on security and being a flexible wallet. The users have total control over their coins and access to their assets at any time.`
  },
  {
    link: "/img/user_panel_right/img-slide3.jpg",
    text: `Leasing means granting the power to forge a block to a network user by lending the Lunes coins that are in your wallet. This allows any user to participate in the forge process with any amount of Lunes.`
  }
];

class Slide extends React.Component {
  render() {
    return (
      <Container>
        <Image imageList={images} />
      </Container>
    );
  }
}

export default Slide;
