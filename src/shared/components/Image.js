import React from "react";
import styled, { css } from "styled-components";
import Carousel from "nuka-carousel";

let Img = styled.img`
  
`;

let DivCarrousel = styled.div`
  margin-top: 4%;
  margin-bottom: 4%;
  width: 75% !important;
  height: 100% !important; 
  
  & .slider-control-bottomcenter ul {
    top: 60px !important;
  }

  & .slider-control-bottomcenter ul li button {
    font-size: 40px !important;
    color: white !important;    
  }

  & .slider-control-centerright button {
    display: none !important;
  }
  & .slider-control-centerleft button {
    display: none !important;
  }
`;

let P = styled.div`
  color: white;
  font-size: 10pt;
  padding-left:15%;
  padding-right:15%;
  margin-top: 4%;
  margin-bottom: 4%;
  text-align: center;
`;
let DivParagraph = styled.div`
  width: 650px;
  margin-left: 10px;
`;

class Image extends React.Component {
  handleChange = index => {
    if (index == this.props.imageList.length) this.renderImage(this.props.imageList);
  };
  render() {
    return (
      <DivCarrousel>
        <Carousel wrapAround autoplay>
          {this.renderImage(this.props.imageList)}
        </Carousel>
      </DivCarrousel>
    );
  }

  renderImage = images => {
    return images.map((photo, index) => (
      <DivParagraph key={index}>
        <Img src={photo.link} />
        <P>{photo.text}</P>
      </DivParagraph>
    ));
  };
}

export default Image;
