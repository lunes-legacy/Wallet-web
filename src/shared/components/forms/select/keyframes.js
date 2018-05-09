import { keyframes } from 'styled-components';

const bounce_up_select_option = keyframes`
	0%   {transform: scale(1);    box-shadow: none; }
	100% {transform: scale(1.05); box-shadow: 0 0 10px 0 rgba(0,0,0,.5); font-weight: bold;}
`;
const slide_down_select_content = keyframes`
	0%   {transform: scaleY(0);}
	100% {transform: scaleY(1);}	
`;
const slide_up_select_content = keyframes`
	0%   {transform: scaleY(1);}
	100% {transform: scaleY(0);}	
`;
const rotate_arrow_down = keyframes`
	0%   {transform: rotate(0deg);}
	100% {transform: rotate(180deg);}	
`;
const rotate_arrow_up = keyframes`
	0%   {transform: rotate(180deg);}
	100% {transform: rotate(0deg);}	
`;

export {
	bounce_up_select_option,
	slide_down_select_content,
	slide_up_select_content,
	rotate_arrow_down,
	rotate_arrow_up
}