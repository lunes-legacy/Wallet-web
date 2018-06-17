import React, { Component } from "react";
import styled from 'styled-components';
import styles from 'Shared/style-variables';
import { NavLink as TmpLink } from 'react-router-dom';
import { TextBase } from 'Components/TextBase';

const WrapLink = styled.div`
  display: block; //flex
  flex-wrap: nowrap;
	justify-content: flex-start;
  width: 100%;
`;

const Icon = styled.img`
	width: 25px;
	height: 25px;
  transition: .2s;
`;


const CustomLink = styled(TmpLink)`
  ${TextBase};

  color: white;
  text-decoration: none;
  transition-delay: .2s;
  display: flex;
  align-items: center;
  transition: .2s;
  opacity: 0.3;

  border-left: solid 8px rgba(0,0,0,0);
  padding-left: 10px;
  height: 56px;

  -webkit-filter: grayscale(100%);
  filter: grayscale(100%);

  &:hover {
    opacity: 1;

    -webkit-filter: none;
    filter: none;
  }

  &.active {
    opacity: 1;
    border-left: solid 8px #4cd566;
    padding-left: 6px;

    -webkit-filter: none;
    filter: none;
  }

  &.deactive {
    opacity: 0.3;
    border-left: none;
    padding-left: none;

    -webkit-filter: none;
    filter: none;
  }
`;

const CustomText = styled.div`
  ${TextBase};
  margin-left: 1rem;
  display: none;
  font-size: 1.2rem;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  font-weight: 600;
  letter-spacing: 0.5px;

  @media (${styles.media.tablet2}) {
    display: inline-block;
  }
`;

class ItemMenuApp extends Component {
  render() {
    return (
      <WrapLink>
        <CustomLink {...this.props}>
          <Icon src={'/img/app_panel_left/' + this.props.icon} alt={this.props.label} />
          <CustomText size={'1.4rem'} >{this.props.label}</CustomText>
        </CustomLink>
      </WrapLink>
    )
  };
}

export default ItemMenuApp;