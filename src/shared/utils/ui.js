export const toggleTranslateX = ({element, from, to}) => {
	let state = element.getAttribute('state');
	if (state === 'visible') {
		element.style.transform = 'translateX(-100%)';
		element.style.maxWidth  = '0px';
		element.setAttribute('state', 'hidden');
		visibilityAllChildren({element, value: 'hidden'});
	} else {
		element.style.transform = 'translateX(0px)';
		element.style.maxWidth  = '1000px';
		element.setAttribute('state', 'visible');
		visibilityAllChildren({element, value: 'visible'});
	}
}
export const toggleWidth = ({element, visible, hidden}) => {
	let state = element.getAttribute('state');
	if (state === 'visible') {
    element.style.width    = hidden;
		element.style.minWidth = '0';
    element.style.maxWidth = '0px';
		element.style.maxWidth = '280px';
		element.setAttribute('state', 'hidden');
		visibilityAllChildren({element, value: 'hidden'});
	} else {
		element.style.width    = visible;
		element.style.minWidth = '130px';
		element.style.maxWidth = '280px';
		element.setAttribute('state', 'visible');
		setTimeout(() => {
			visibilityAllChildren({element, value: 'visible'});
		}, 300);
	}
}
export const toggleScaleX = ({element, visible, hidden}) => {
	let state = element.getAttribute('state');
	if (state === 'visible') {
		element.style.transform = `scaleX(${hidden})`;
    element.style.opacity   = `0`;
		element.style.maxWidth = '280px';
		element.setAttribute('state', 'hidden');
	} else {
		element.style.transform = `scaleX(${visible})`;
		element.style.opacity   = `1`;
		element.setAttribute('state', 'visible');
	}
}
export const toggleScaleY = ({element, visible, hidden}) => {
	let state = element.getAttribute('state');
	if (state === 'visible') {
		element.style.transform = `scaleY(${hidden})`;
		element.setAttribute('state', 'hidden');
	} else {
		element.style.transform = `scaleY(${visible})`;
		element.setAttribute('state', 'visible');
	}
}
export const visibilityAllChildren = ({element, value}) => {
	let children = element.children;
	Array.from(children).map((child) => {
		child.style.visibility = value;
	});
}

export const toggleArrowIcon = ({element}) => {
  const direction = element.getAttribute('direction');

  if (direction === 'right') {
    element.style.transform = 'rotate(135deg)';
    element.style.left = '2px';
    element.setAttribute('direction', 'left');
  } else {
    element.style.transform = 'rotate(-45deg)';
    element.style.left = '5px';
		element.setAttribute('direction', 'right');
  }
}
