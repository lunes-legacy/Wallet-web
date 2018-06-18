import React from "react";
import styled, { css } from "styled-components";


let Img = styled.img`
  width: 65%;
  height: auto;
  padding: 8px;
  margin-left: 14%;
 
`;

let DivCarrousel = styled.div`
  margin-top: 4%;
  width: 75% !important; 
  
  & .slider-list {
    height: 80vh !important;
  }

  & .slider-control-bottomcenter ul {
    top: 1rem !important;
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
  padding-left:auto;
  padding-right:auto;
  margin-top: 4%;
  margin-bottom: 4%;
  text-align: center;
  line-height: 1.5;
`;
let DivParagraph = styled.div`
  margin: auto;
  width: 80%;
  padding: 10px;
`;

let DivImage = styled.div`
  width: 100%;
  height: auto;
  padding-right: 15%;

 
`;
class Image extends React.Component {
  handleChange = index => {
    if (index == this.props.imageList.length) this.renderImage(this.props.imageList);
  };
  render() {
    return (
      // <DivCarrousel>
      //   <Carousel wrapAround autoplay>
      //     {this.renderImage(this.props.imageList)}
      //   </Carousel>
      // </DivCarrousel>
      <DivImage>
        <Img src={"/img/user_panel_right/lunio-welcome.png"} />
        <DivParagraph>
          <P>Welcome to the first multiservice wallet in the world. <br />We offer an innovative and intelligent financial ecosystem with unique features and modern design.</P>
        </DivParagraph>
      </DivImage>
    );
  }

  renderImage = images => {
    return images.map((photo, index) => (
      <div key={index}>
        <Img src={photo.link} />
        <DivParagraph>
          <P>{photo.text}</P>
        </DivParagraph>
      </div>

    ));
  };
}

export default Image;
