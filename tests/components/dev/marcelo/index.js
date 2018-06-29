import React      from 'react';
import { render } from 'react-dom';
import ModalSend  from 'Containers/Wallet/PanelRight/Modal/Send/index';
import { toggleModal } from 'Containers/Wallet/PanelRight/Modal/ui';
import Receive    from 'Containers/Wallet/PanelRight/Modal/Receive/index';
// import LeasingModal    from 'Containers/leasing/modal/index';
import Input      from 'Components/forms/Input';
import { Col, Row } from 'Components/index';
//REDUX
import { store }  from 'Redux/stores';
import { Provider }  from 'react-redux';

window.onload = function () {
  setTimeout(() => {
    toggleModal(document.querySelector('.js-modal-send'));
  }, 1000);
}
const toRender = () => {
  return(
    <Provider store={store}>
      <ModalSend/>
    </Provider> 
  );
}
// const toRender = () => {
// 	return(
// 		<LeasingModal isShow={true}/>
// 	);
// }

export default toRender;
