import React from 'react';
import { timer } from 'Utils/functions';
import { Text, Col, Row } from 'Components';
import { Wrapper, Input } from './static-components.js';
import { PDVClass } from 'Classes';

function phoneNumberMask() {

}
function validatePhoneNumber(country, value) {
  if (!value)
    return { result: false, message: `Phone number is undefined`}
  if (country.toUpperCase() !== 'BR')
    return { result: false, message: 'This feature is not available to other countries' }

  let regex = /^\+55\s?\(?([0-9]{2})\)?\s?9?\s?([0-9]{8})/
  let isValid = value.search(regex) !== -1 ? true : false;
  if (!isValid)
    return { result: false, message: 'Phone number isnt right' }
  return { result: true, message: 'Phone number is right' }
}

const PDV = new PDVClass;

const initialState = {
  errors: [
    // { message: '' }
  ],
  successes: [
    // { message: '' }
  ],
  inputs: {
    phoneNumber: undefined,
    pin: undefined
  },
}
class Redeem extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.DOM   = {
      phoneNumber: undefined,
      pin: undefined
    }
  }
  has = (type) => {
    if (type === 'error')
      return this.state.errors.length > 0 ? true : false;
    else if (type === 'success')
      return this.state.successes.length > 0 ? true : false;
    else
      console.error(`There's no condition for the type ${type}`)
  }
  addMessage = (type, object) => {
    if (object instanceof Object && !object.message) {
      console.error(`There's no message inside param 'object'`);
      return false;
    }
    if (type === 'error') {
      this.setState({
        errors: this.state.errors.concat(object)
      });
    } else if (type === 'success') {
      this.setState({
        successes: this.state.successes.concat(object)
      });
    }
  }
  cleanMessages = async () => {
    await timer(5000);
    this.setState({ errors: [], successes: [] })
  }
  canUserRedeem = () => {
    let { phoneNumber,pin } = this.state.inputs;

    let isPhoneValid = validatePhoneNumber('BR', phoneNumber);
    if (isPhoneValid.result !== true) {
      this.addMessage('error',{ message: isPhoneValid.message });
      return false;
    }
    if (pin.length !== 4) {
      this.addMessage('error',{ message: 'Pin is invalid, got more than 4 characters' });
      return false;
    }

    return true;
  }
  handleRedeem = async () => {
    // if (!this.canUserRedeem()) {
    //   return;
    // }
    let result = await PDV.redeem('12312312312','asdjas9d8as09d8ajasdkjashdas09d8')
      .catch(e => { "message" in e ? this.addMessage('error',{message: e.message}) : this.addMessage('error',{message: 'Error on trying to redeem, unknown error'}) })
    // console.warn(result);

  }
  setAllDOM = async () => {
    await timer(500);
    this.DOM.phoneNumber = document.querySelector('.input-phone-number');
    this.DOM.pin         = document.querySelector('.input-pin');
  }
  handleInput = (name) => {
    let current = this.DOM[name];
    let val     = current.value;
    this.setState({
      inputs: {
        ...this.state.inputs,
        [name]: val
      }
    });
  }
  componentDidMount() {
    this.setAllDOM();
  }
  render() {
    if (this.has('error') || this.has('success')) {
      this.cleanMessages();
    }
    return(
      <Wrapper>
        <Row defaultAling={'center'}>
          <Col s={12} m={6} l={6}>
            <Text clWhite txCenter size={"2.5rem"} onClick={() => { this.handleRedeem() }}>Rescue your coins</Text>
            <Input value={this.state.pin} className={'input-pin'} onChange={() => { this.handleInput('pin') }} placeholder="PIN"/>
            <Input value={this.state.phoneNumber} className={'input-phone-number'} onChange={() => { this.handleInput('phoneNumber') }} placeholder="Phone number"/>
            <MessagesStyler success={this.state.messages} errors={this.state.errors}/>
          </Col>
        </Row>
      </Wrapper>
    );
  }
}


class MessagesStyler extends React.Component {
  componentDidMount() {

  }
  render() {
    if (this.props.errors instanceof Array && this.props.errors.length < 1)
      return null;
    // errors = this.props.errors.filter(error => !errors ? true : errors.indexOf(error) !== -1 ? false : true);
    //remove duplicated errors
    let errors = [];
    for (let i in this.props.errors) {
      let error = this.props.errors[i]
      if (errors.indexOf(error) === -1)
        errors = errors.concat(error)
    }
    return errors.map(error => {
      return (
        <Text clWhite txCenter>{error.message}</Text>
      );
    });
  }
}

export default Redeem;
