import React from "react";
import { users } from "lunes-lib";
import styled from "styled-components";
import validator from "validator";
import style from "Shared/style-variables";

//COMPONENTS
import { Form } from "Components/Form";
import { FormGroup } from "Components/FormGroup";
import { Input } from "Components/Input";
import { ButtonSecondary } from "Components/Buttons";
import { Link, CustomLink } from "Components/Link";
import { H1 } from "Components/H1";
import { H2 } from "Components/H2";
import { H3 } from "Components/H3";
import { P } from "Components/P";
import { Logo } from "Components/Logo";

//PRIVATE COMPONENTS
import PanelLeft from "./PanelLeft";
import PanelRight from "./PanelRight";
import Slide from "../../../containers/User/Login/Slide";
import FooterUser from 'Components/FooterUser'


class Import extends React.Component {
  render() {
    return (
      <div>
        <PanelLeft>
          <p>Import</p>
        </PanelLeft>

        <PanelRight>
          <Slide />
        </PanelRight>
      </div>
    );
  }
}

export default Import;
