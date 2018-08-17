import React from 'react';
import styled from 'styled-components';
import styles from 'Shared/style-variables';
import { TextBase } from 'Components/TextBase';
import { ButtonGreen } from "Components/Buttons";
import { Modal } from 'Components/index';
import ItemMenuApp from "./ItemMenu";
import CookieClass from 'Classes/Cookie';


const StyledPanelLeft = styled.div`
  width: 65px;
  min-width: 65px;
	height: 100%;
  overflow: auto;
  display: block;
  background: ${styles.normalLilac2};
	z-index: 3;
  transition: .2s ease-in;

  padding-top:4rem;

  @media (${styles.media.tablet2}) {
    width: 160px;
  }
`;

const CustomText = styled.div`
  ${TextBase};
  margin-left: 1rem;
  display: none;
  font-size: 1.2rem;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  font-weight: 600;
  letter-spacing: 0.5px;

  @media (${styles.media.tablet2}) {
    display: inline-block;
  }
`;

const CustomTextPopup = styled.div`
  ${TextBase};
  display: block;
  font-size: 1.4rem;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  //font-weight: 600;
  letter-spacing: 0.5px;
`;

const LinkLogout = styled.div`
  ${TextBase};

  color: white;
  text-decoration: none;
  transition-delay: .2s;
  display: block;
  text-align:center;
  transition: .2s;
  opacity: 0.3;
  z-index: 3;

  padding: 10px;

  &:hover {
    opacity: 1;
  }

  position: absolute;
  top: 100%;
  margin-top:-56px;
  margin-left: 20px;
  cursor: pointer;
`;

class PanelLeft extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpenSignout: false,
    };
  }

  toggleModalSignout = () => {
    this.setState(prevState => ({
      isOpenSignout: !prevState.isOpenSignout
    }));
  }


  logoutAction = () => {

    let cookie = new CookieClass();
    cookie.set({ name: 'user', value: null, expires: -1 });
    this.props.history.push('/');
    localStorage.clear();
    return;
  }

  render() {
    return (
      <StyledPanelLeft>
        <ItemMenuApp
          label="Home"
          to="/app/home"
          icon="ic_home.svg"
          activeClassName="active" />

        <ItemMenuApp
          label="Wallet"
          to="/app/wallet"
          icon="ic_wallet.svg"
          activeClassName="active" />

        <ItemMenuApp
          label="Leasing"
          to="/app/leasing"
          icon="ic_leasing.svg"
          activeClassName="active" />

        {/*<ItemMenuApp
          label="Settings"
          to="/app/configuration"
          icon="ic_config.svg"
          activeClassName="active" />*/}

        <ItemMenuApp
          label="Privacy"
          to="/app/privacy"
          icon="ic_privacy.svg"
          activeClassName="active" />

        {/*<ItemMenuApp
          label="Redeem"
          to="/app/redeem"
          icon="ic_privacy.svg"
          activeClassName="active" />*/}

        {/* <ItemMenuApp
          label="Recharge"
          to="/app/recharge"
          icon="ic_recharge.svg"
          onClick={() => this.handleMenuActive("recharge")}
                    activeClassName="active" /> */}

        {/* <ItemMenuApp
          label="Boleto"
          to="/app/ticket"
          icon="ic_barcode.svg"
          onClick={() => this.handleMenuActive("ticket")}
                    activeClassName="active" /> */}

        {/* <ItemMenuApp
          label="Compras"
          to="/app/buy"
          icon="ic_buy.svg"
          onClick={() => this.handleMenuActive("buy")}
                    activeClassName="active" />*/}

        {/* <ItemMenuApp
          label="Portfólio"
          to="/app/portfolio"
          icon="ic_portfolio.svg"
          onClick={() => this.handleMenuActive("portfolio")}
                    activeClassName="active" /> */}


        <LinkLogout onClick={() => this.toggleModalSignout()}>
          <CustomText size={'1.4rem'}>Sign out</CustomText>
        </LinkLogout>
        <Modal
          isOpen={this.state.isOpenSignout}
          onClose={this.toggleModalSignout}
          height={'30%'}
          width={'40%'}
          header={''}
          headerAlign={'justify'}
          text={
            <div>
              <CustomTextPopup>If you sign out, the next time you log in the seed will be asked.</CustomTextPopup>
              <ButtonGreen onClick={() => this.logoutAction()} width="70%" margin={"3rem auto 3rem auto"} fontSize={'1rem'}>Ok, I want to sign out</ButtonGreen>
            </div>
          }
        />
      </StyledPanelLeft>
    );
  }
}

export default PanelLeft;
