import React from "react";
import styled from 'styled-components';

// Private components
import { Row, Col } from 'Components/index';
import PanelLeft from './PanelLeft';
import PanelRight from './PanelRight';

const UserContainer = styled.div`
  border-radius: 10px;
  height: 100%;
  padding: 1rem;
  text-align: center;
  width: 100%;
`;

class User extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <UserContainer>
        <Row>
          <Col s={12} m={4} l={4}>
            <PanelLeft />
          </Col>
          <Col s={12} m={8} l={8}>
            <PanelRight />
          </Col>
        </Row>
      </UserContainer>
    );
  }
}

export default User;
