import { css } from 'styled-components';
import style from 'Shared/style-variables';
import { ColBase } from './ColBase';
let RowBase = css`
	${props => {
		let local = [];
		if (!props.defaultAlign) {
			!props.sAlign ? local['sAlign'] = 'center' : local['sAlign'] = props.sAlign;
			!props.mAlign ? local['mAlign'] = 'center' : local['mAlign'] = props.mAlign;
			!props.lAlign ? local['lAlign'] = 'center' : local['lAlign'] = props.lAlign;

			for (let key in local) {
				if (local[key] === 'left')
					local[key] = 'flex-start';
				if (local[key] === 'right')
					local[key] = 'flex-end';
			}
		} else {
			local['sAlign'] = props.defaultAlign;
			local['mAlign'] = props.defaultAlign;
			local['lAlign'] = props.defaultAlign;
		}

		return `
			@media (${style.media.mobile}) {
				justify-content: ${local.sAlign};
			}
			@media (${style.media.tablet2}) {
				justify-content: ${local.mAlign};
			}
			@media (${style.media.desktop2}) {
				justify-content: ${local.lAlign};
			}
		`;
	}}
`;

export default RowBase;