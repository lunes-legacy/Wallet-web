import React from "react";
import styled from "styled-components";
import validator from "validator";
import style from "Shared/style-variables";
// LIBS
import { encrypt } from '../../../utils/crypt'

//REDUX
import { connect } from "react-redux";
import { userLogin, userClear, setWalletInfo } from 'Redux/actions';

//COMPONENTS
import { Form } from "Components/Form";
import { FormGroup } from "Components/FormGroup";
import { Input } from "Components/Input";
import { ButtonSecondary } from "Components/Buttons";
import { CustomLink } from "Components/Link";
import { CustomLinkFooter } from "Components/Link";
import { H1 } from "Components/H1";
import { Logo } from "Components/Logo";
import { P } from "Components/P";
import { Col, ErrorBoundary } from 'Components';


//PRIVATE COMPONENTS
import PanelLeft from "./PanelLeft";
import PanelRight from "./PanelRight";
import Slide from "../../../containers/User/Login/Slide";

const WrapPhrases = styled.div`
  width: 100%;
  margin-top: 10%;

  @media (${style.media.tablet2}) {
    margin-top: 12%;
  }

  @media (${style.media.desktop}) {
    margin-top: 25%;
  }
`;

const CustomP = P.extend`
  display: block;
  margin: 10px auto 10px auto;
  text-align: center;

  @media only screen and (min-width: 768px) {
    position: absolute;
    bottom: 0;
    width: 40%;
  }
`;

const CustomLogo = Logo.extend`
  margin: 70px auto 20px auto;
`;

const CustomLinkRight = CustomLink.extend`
  text-align: right;
`;

const Paragraph = styled.div`
  margin-top: 12px;
  color: white;
  width: 100%;
  text-align: center;
  font-size: 1.5rem;
`;
class Login extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidUpdate() {
    this.handleStatus();
  }

  componentDidMount() {
    let walletInfo = localStorage.getItem('WALLET-INFO');
    let accessToken = localStorage.getItem('ACCESS-TOKEN');
    if (walletInfo && accessToken) {
      this.props.history.push('/app/home')
    } else if (walletInfo) {
      this.props.history.push('/import')
    } else {
      this.props.userClear();
      this.props.setWalletInfo({});
    }
  }

  getSeed() {
    let walletInfo = localStorage.getItem('WALLET-INFO');
    let emailEl = document.querySelector(".login-email");
    localStorage.setItem('ACCESS-TOKEN', encrypt(JSON.stringify({ email: emailEl.value, accessToken: this.props.user.data.accessToken })));
    walletInfo ? ( this.props.history.push('/app/home') ) : ( this.props.history.push('/import') )
  }

  handleLogin = event => {
    event.preventDefault();

    let emailEl = document.querySelector(".login-email");
    let passEl = document.querySelector(".login-password");

    let email = emailEl.value;
    let password = passEl.value;

    this.props.userLogin({
      email,
      password
    });

    let errors = [];
    if (!validator.isEmail(emailEl.value)) {
      errors.push('A valid email must be informed');
    }
    if (validator.isEmpty(passEl.value)) {
      errors.push('Password Field empty');
    }
    if (errors.length > 0) {
      alert('- ' + errors.join('\n- '));
      return;
    }
  };

  handleStatus() {
    try {
      let statusEl = document.querySelector(".js-status");
      let { status } = this.props.user;
      if (status === "pending") {
        statusEl.textContent = "Loading...";
      } else if (status === "fulfilled") {
        this.getSeed();
      }
      else if (status === "rejected") {
        statusEl.textContent = "Try again";
      }
    }
    catch (err) {
      console.warn("There's an error on handleStatus", 500, 'HANDLE_STATUS_ERROR', err);
    }
  }

  render() {
    let { status, logged } = this.props.user;

    return (
      <div>
        <PanelLeft>
          <CustomLogo />

          <WrapPhrases>
            <H1 clNormalGreen txCenter margin-top={"10%"}>
              Fast, safe and smart!
            </H1>
            <Paragraph clWhite txCenter margin={"20px 0 70px 0"} fontSize={"1.4rem"}>
              Enter your information:
            </Paragraph>
          </WrapPhrases>

          <Form margin={"10% auto 2% auto"} width={"80%"}>
            <FormGroup>
              <Input placeholder={"nome@email.com"} className={"login-email"} placeholder={"E-mail"} type={"email"} required />
            </FormGroup>
            <FormGroup>
              <Input placeholder={"Password"} className={"login-password"} type={"password"} required />
            </FormGroup>

            <CustomLinkRight to={"/reset"} margin={"0 auto 20px auto"}>
              Forgot your password?
            </CustomLinkRight>

            <ButtonSecondary secondary onClick={this.handleLogin}>
              {logged ? "Logged in" : "Login"}
            </ButtonSecondary>
          </Form>
          <Col s={12} m={12} l={12}>
            <P txCenter clWhite margin={"0 0 0 0"} fontSize={"1.4rem"} className={"js-status"} />

            <CustomP clWhite fontSize={"1.4rem"}>
              Don't have an account?{" "}
              <CustomLinkFooter to={"/registry"} color={`${style.normalGreen}`} >
                Sign up.
              </CustomLinkFooter>
            </CustomP>
          </Col>


        </PanelLeft>

        <PanelRight>
          <Slide />
        </PanelRight>
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    user: state.user,
    walletInfo: state.walletInfo
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setWalletInfo: data => {
      dispatch(setWalletInfo(data));
    },
    userLogin: (email, password) => {
      dispatch(userLogin(email, password));
    },
    userClear: () => {
      dispatch(userClear());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
