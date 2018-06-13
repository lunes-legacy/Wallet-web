import React from "react";
import styled from 'styled-components';

// Private components
import style from 'Shared/style-variables';

const PanelStyle = styled.div`
  background-color: rgba(114,92,152,0.2);
  height: 36rem;
  width: 100%;
  text-align: center;
  overflow: hidden;
`;

const Form = styled.form`
  margin: 0 auto;
  padding: 2rem 1rem;
  width: 90%;
`;

const Input = styled.input`
  background-color: transparent;
  border: none;
  border-bottom: 2px solid ${style.lightPurple};
  color: #fff;
  font-size: 1.4rem;
  font-weight: 100;
  height: 3rem;
  margin: 1rem 0;
  padding: 0 1rem;
  width: 100%;
`;

const Label = styled.div`
  color: ${style.normalGreen};
  text-align: left;
`;

const BtnEdit = styled.button`
  position: relative;
  background-color: transparent;
  border: none;
  color: ${style.normalGreen};
  cursor: pointer;
  float: right;
  font-size: 1.4rem;
  margin: 2rem 2rem 0 0;
`;

class PanelLeft extends React.Component {
  render() {
    return(
      <PanelStyle>
        <BtnEdit>Edit</BtnEdit>
        <Form>
          <Label htmlFor="fullName">Full Name</Label>
          <Input type="text" id="fullName" value="Lucas Magno"/>
          <Label htmlFor="phone">Phone</Label>
          <Input type="text" id="phone" value="(11) 9999-9999"/>
          <Label htmlFor="address">Address</Label>
          <Input type="text" id="address" value="Rua dos Coqueiros"/>
          <Label htmlFor="email">E-mail</Label>
          <Input type="email" id="email" value="email@lunes.io"/>
          <Label htmlFor="birthDate">Birth date</Label>
          <Input type="date" id="birthDate" value="1987-06-01"/>
        </Form>
      </PanelStyle>
    );
  }
}

export default PanelLeft;
