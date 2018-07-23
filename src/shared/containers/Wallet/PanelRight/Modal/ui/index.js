import ReactDOM from 'react-dom';

const resetModalStep = (_that) => {
  _that.setState({currStep: 0}, () => {
    console.warn('ralative variable that was able to set state !!!');
  });
}
export const toggleModal = (modal, _that) => {
	if (typeof modal === 'string')
		modal = document.querySelector(`.${modal}`);

  let background = modal.parentElement;

	let state = modal.getAttribute('state');
	if (state === 'hidden' || !state) {
		background.style.opacity    = '1';
		modal.style.transform       = 'translateY(0px)';
		background.style.visibility = 'visible';
		modal.setAttribute('state','visible');
	} else {
		background.style.opacity    = '0';
		background.style.visibility = 'hidden';
		modal.style.transform       = 'translateY(-100%)';
    modal.setAttribute('state','hidden');
    resetModalStep(_that);
  }

  if (modal) {
    // Função para fechar a modal ao pressionar ESC
    document.addEventListener('keydown', (event) => {
      event = event || window.event;
      if (event.keyCode == 27) {
        background.style.opacity    = '0';
        background.style.visibility = 'hidden';
        modal.style.transform       = 'translateY(-100%)';
        modal.setAttribute('state','hidden');
        resetModalStep(_that);
      }
    });
  }
}
