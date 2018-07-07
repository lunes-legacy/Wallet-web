import React from "react";
import styled from "styled-components";

//COMPONENTS
import TabsBuilder from "Components/Tabs";
import { ErrorBoundary } from 'Components';

// PAGE
import Backup from "./Backup/backup";
import Rescue from "./Rescue/rescue";

const Container = styled.div`
  padding: 50px 100px;
  width: 90%;
`;

const tabTitle = [
	'Safety phrase',
  'Import seedwords'
]

class Privacy extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Container>
        <ErrorBoundary>
          <TabsBuilder tabTitle={tabTitle} tabContent={[<Backup />, <Rescue />]}/>
        </ErrorBoundary>
      </Container>
    );
  }
}

export default Privacy;

