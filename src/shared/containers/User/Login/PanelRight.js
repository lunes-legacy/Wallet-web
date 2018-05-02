import React from "react";
import styled from "styled-components";

import variables from "Shared/style-variables";

export const PanelRight = styled.main`
  float: left;
  width: 60%;
  height: 100vh;
  background: ${variables.normalLilac};

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export default PanelRight;
