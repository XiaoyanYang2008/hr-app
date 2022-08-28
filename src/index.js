import React from 'react';
import { render } from 'react-dom';
import {SnackbarProvider} from 'notistack';

import './index.css';
import App from './App';

const rootElement = document.getElementById('root');
render(
  <React.StrictMode>
	<SnackbarProvider dense maxSnack={1} anchorOrigin={{horizontal: 'right', vertical: 'top'}}>
    <App />
	</SnackbarProvider>
  </React.StrictMode>,
  rootElement
);
