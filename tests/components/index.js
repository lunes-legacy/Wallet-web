import React from 'react';
import {render} from 'react-dom';
import toRender from './dev/gabriel';
// import toRender from './dev/marcelo';

render(toRender(), document.querySelector(".root"));
