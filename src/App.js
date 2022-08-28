import { Fragment } from 'react';
import './App.css';
import {SnackbarProvider} from 'notistack';

import SideBar from './components/sidebar/sidebar';

function App() {
  return (
	<Fragment>
	<SnackbarProvider dense maxSnack={1} anchorOrigin={{horizontal: 'right', vertical: 'top'}}>
	<SideBar />
	</SnackbarProvider>
	</Fragment>
  );
}

export default App;
