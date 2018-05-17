import { css } from "styled-components";
import style from "Shared/style-variables";

export let TextBase = css`
	${props => {
    if (props.fontSize) {
      return `font-size: ${props.fontSize};`;
    }
    return "font-size: 1.8rem;";
  }}
	${props => {
    if (props.clNormalGreen) {
      return `color: ${style.normalGreen}`;
    } else if (props.clWhite) {
      return `color: white`;
    } else if (props.clNormalLilac) {
      return `color: ${style.normalLilac}`;
    } else if (props.clLightLilac) {
      return `color: ${style.lightLilac}`;
    }
  }}
	${props => {
    if (props.txCenter) {
      return "text-align: center";
    } else if (props.txRight) {
      return "text-align: right";
    }
  }}
	${props => {
    if (props.margin && props.margin.indexOf('rem') !== -1) {
      return `margin: ${props.margin};`;
    }
  }}
	${props => {
    if (props.padding) {
      return "padding: " + props.padding + ";";
    }
  }}
	${props => {
    if (props.size && props.size.indexOf("rem") !== -1) {
      return `font-size: ${props.size}`;
    }
  }}
	${props => {
    if (props.txBold) {
      return "font-weight: bold;";
    } else if (props.txLight) {
      return "font-weight: 100;";
    } else if (props.txNormal) {
      return "font-weight: 300;";
    }

    if (props.txItalic) {
      return "font-style: italic;";
    } else if (props.txOblique) {
      return "font-style: oblique;";
    }
  }}
	${props => {
    if (props.txInline) {
      return "display: inline;";
    } else if (props.txInlineBlock) {
      return "display: inline-block;";
    }
  }}
  ${props => {
    if (props.offSide) {
      return "font-family: OffSide";
    }
  }}
`;
