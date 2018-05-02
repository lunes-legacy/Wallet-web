import React from "react";
import styled from "styled-components";

let Container = styled.div`
  margin: 0 auto;
  margin-top: 20px;
  position: relative;
  width: $big_width;
  height: 0;
  padding-bottom: $big_height;
  user-select: none;
  background-color: #1c1c1c;
  box-shadow: $box-shadow;
`;

let SlideImage = styled.div`
  position: absolute;
  width: 50%;
  height: 50%;
  z-index: -1;
`;

let SlideNav = styled.nav`
  width: 100%;
  bottom: 12%;
  height: 11px;
  position: absolute;
  text-align: center;
  z-index: 99;
  cursor: default;
`;

class Slide extends React.Component {
  render() {
    return (
      <section>
        <Container>
          <SlideImage>
            <img src="http://www.bhmpics.com/wallpapers/little_pony_art-800x480.jpg" />
          </SlideImage>

          <SlideNav>
            <label htmlFor={"i1"} className="dots" id="dot1" />
            <label htmlFor={"i2"} className="dots" id="dot2" />
            <label htmlFor={"i3"} className="dots" id="dot3" />
            <label htmlFor={"i4"} className="dots" id="dot4" />
          </SlideNav>

          <div>
            <input type={"radio"} id="i1" name="images" />
            <input type={"radio"} id="i2" name="images" />
            <input type={"radio"} id="i3" name="images" />
            <input type={"radio"} id="i4" name="images" />
          </div>
        </Container>
      </section>
    );
  }
}

export default Slide;
