import React from 'react';
import styled from 'styled-components';
import style from 'Shared/style-variables';
import { ButtonBase } from './ButtonBase';

export let Button = styled.button`
	${ButtonBase}
`;
export let ButtonSecondary = Button.extend`
	background: transparent;
	border: 1.5px solid ${style.normalGreen};

	transition: background 0.2s;
	&:hover {
		background: ${style.normalGreen};
	}
  padding: 10px 20px 10px 20px;
  ${props => {
    if (props.width) {
      return `width: ${props.width};`;
    }
    return "width: 100%;";
  }}
  ${props => {
    if (props.margin && props.margin.indexOf('rem') !== -1) {
      return `margin: ${props.margin};`;
    }
  }}
`;

export let ButtonDisabled = Button.extend`
	background: ${style.disabledGray};
  color: ${style.disabledText};
	${props => {
    if (props.width) {
      return `width: ${props.width};`;
    }
    return "width: 100%;";
	}}
	${props => {
    if (props.height) {
      return `height: ${props.height};`;
    }
    return "height: 38px;";
  }}
	${props => {
    if (props.margin && props.margin.indexOf('rem') !== -1) {
      return `margin: ${props.margin};`;
    }
  }}
`;

export let ButtonGreen = Button.extend`
	background: ${style.normalGreen};
	border: 1.5px solid ${style.normalGreen};
	${props => {
    if (props.width) {
      return `width: ${props.width};`;
    }
    return "width: 100%;";
	}}
	${props => {
    if (props.height) {
      return `height: ${props.height};`;
    }
    return "height: 38px;";
  }}
	${props => {
    if (props.margin && props.margin.indexOf('rem') !== -1) {
      return `margin: ${props.margin};`;
    }
  }}
`;
