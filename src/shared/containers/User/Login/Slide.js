import React from "react";
import Image from "../../../components/Image";
import styled from "styled-components";

let Container = styled.div`
  margin: 0 auto;
  position: center;
  margin-top: 50px;
  margin-left: 20%;
  margin-right: 11%;
  width: 80%;
`;

let images = [
  {
    link:
      "https://cdn.discordapp.com/attachments/441307920714694656/441312361442181140/Browser_window1.png",
    text: `Aproveite da usabilidade e tecnologia desta incrível carteira e armazene suas criptomoedas com um alto nível de segurança.`
  },
  {
    link:
      "https://cdn.discordapp.com/attachments/441307920714694656/441312361794502657/Browser_window2.png",
    text: "EXEMPLO2"
  },
  {
    link:
      "https://cdn.discordapp.com/attachments/441307920714694656/441312363249926154/Browser_window3.png",
    text: "EXEMPLO3"
  }
];

class Slide extends React.Component {
  render() {
    return (
      <section>
        <Container>
          <Image imageList={images} />
        </Container>
      </section>
    );
  }
}

export default Slide;
