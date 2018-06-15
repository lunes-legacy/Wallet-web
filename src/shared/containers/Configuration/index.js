import React from "react";
import styled from "styled-components";
import style from 'Shared/style-variables';

//COMPONENTS
import TabsBuilder from "Components/Tabs";

// PAGE
import User from "./User/index";
// import Rescue from "./Rescue/rescue";

const Container = styled.div`
  padding: 50px 100px;
  width: 90%;
`;

const UserInfo = styled.div`
  color: #fff;
  font-weight: bold;
  text-align: right;
  width: 100%;
`;

const GreenSpan = styled.span`
  color: ${style.normalGreen};
  font-weight: bold;
`;

const tabTitle = [
	'Personal data',
  'Notifications settings',
  'Account settings'
]

class Configuration extends React.Component {

  render() {
    return (
      <Container>
        <UserInfo>
          Registry date: <GreenSpan>Junho 8, 2018</GreenSpan>
          <br />
          User ID: <GreenSpan>000001</GreenSpan>
        </UserInfo>
        <TabsBuilder tabTitle={tabTitle} tabContent={[<User />, 'Notifications', 'Account']}/>
      </Container>
    );
  }
}

export default Configuration;
