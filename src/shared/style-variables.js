import { hexToRgba } from 'Utils/functions';
//media: {
// 	mobile: 'min-width: 0px',     #small
// 	mobile2: 'min-width: 470px',  #small
// 	tablet: 'min-width: 590px',   #small
// 	tablet2: 'min-width: 790px',  #medium
// 	laptop: 'min-width: 1014px'   #medium
// 	desktop: 'min-width: 1356px', #medium 
// 	desktop2: 'min-width: 1590px',#large 
// 	fullhd: 'min-width: 1970px'   #large
// }

module.exports = {
	rgba: hexToRgba,
	darkLilac: '#3B1878',
	normalLilac: '#4B2C82',
	normalLilac2: '#3F1C7B',
	normalLilac3: '#432678',
	lightLilac: '#725C98',
	normalGreen: '#4CD566',
	normalRed: '#FF1C38',
	marginTopSmall: '10px',
	marginTopNormal: '15px',
	marginTopRegular: '20px',
	marginTopBig: '30px',
	marginTopHuge: '50px',
	media: {
		mobile: 'min-width: 0px',     
		mobile2: 'min-width: 470px',  
		tablet: 'min-width: 590px',   
		tablet2: 'min-width: 790px',  
		laptop: 'min-width: 1014px',
		desktop: 'min-width: 1356px', 
		desktop2: 'min-width: 1590px',
		fullhd: 'min-width: 1970px'   
	}
}