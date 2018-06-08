import React from "react";
import styled from "styled-components";
import style from "Shared/style-variables";

// LIBS
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

//COMPONENTS
import TabsBuilder from "Components/Tabs";
import { H1 } from "Components/H1";
import { H2 } from "Components/H2";
import { P } from "Components/P";

// PAGE
import Backup from "./Backup/backup";
import Rescue from "./Rescue/rescue";

const Container = styled.div`
  padding: 50px 100px;
  width: 90%;
`;

const tabTitle = [
	'Backup de Segurança',
	'Resgate'
]

class Privacy extends React.Component {
  render() {
    return (
      <Container>
        <TabsBuilder tabTitle={tabTitle} tabContent={[<Backup/>, <Rescue/>]}/>
      </Container>
    );
  }
}

export default Privacy;
