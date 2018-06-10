import React from "react";
import styled from "styled-components";

//COMPONENTS
import TabsBuilder from "Components/Tabs";

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
        <TabsBuilder tabTitle={tabTitle} tabContent={[<Backup />, <Rescue/>]}/>
      </Container>
    );
  }
}

export default Privacy;

