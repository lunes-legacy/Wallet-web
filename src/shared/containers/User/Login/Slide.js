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
    link: "/img/user_panel_right/img-slide1.png",
    text: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. 
    Cum sociis natoque penatibus et magnis dis parturient montes.`
  },
  {
    link: "/img/user_panel_right/img-slide2.png",
    text: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. 
    Cum sociis natoque penatibus et magnis dis parturient montes.`
  },
  {
    link: "/img/user_panel_right/img-slide3.png",
    text: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. 
    Cum sociis natoque penatibus et magnis dis parturient montes.`
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
