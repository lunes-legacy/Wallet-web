import { css } from "styled-components";
import style   from "Shared/style-variables";

let GridBase = css`
	${props => {
		if (!props.s)
			props.s = 12;
		if (!props.m)
			props.m = 12;
		if (!props.l)
			props.l = 12;
		let sWidth = (100 / 12) * props.s;
		let mWidth = (100 / 12) * props.m;
		let lWidth = (100 / 12) * props.l;

		return `
			@media (${style.media.mobile}) {
				width: ${sWidth}%;
			}
			@media (${style.media.tablet2}) {
				width: ${mWidth}%;
			}
			@media (${style.media.desktop2}) {
				width: ${lWidth}%;
			}
		`;
	}}
`;

export default GridBase;