import ReactDOM from 'react-dom';

export const toggleModal = (modal) => {
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
  }

  if (modal) {
    // Função para fechar a modal ao pressionar ESC
    document.addEventListener('keydown', (event) => {
      event = event || window.event;
      if (event.keyCode == 27) {
        toggleModal(modal);
      }
    });
  }
}
