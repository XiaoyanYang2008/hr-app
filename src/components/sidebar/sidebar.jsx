import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import {CssBaseline,Drawer,IconButton} from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import {List, ListItem,ListItemButton,ListItemText}   from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PlagiarismIcon from '@mui/icons-material/Plagiarism';
import Toolbar from '@mui/material/Toolbar';

import EmployeesList from '../employees/employees-list';
import './sidebar.style.css';
import { Divider } from '@material-ui/core';

const drawerWidth = 180;
const list = [
	{id: 'e0001',login: 'hpotter',name: 'Harry Potter', salary: 1234.00 },
	{id: 'e0002',login: 'rwesley',name: 'Ron Weasley', salary:19234.50 },
	{id: 'e0003',login: 'ssnape',name: 'Severus Snape', salary:4000.0 },
	{id: 'e0004',login: 'rhagrid',name: 'Rubeus Hagrid', salary:3999.999},
	{id: 'e0005',login: 'voldemort',name: 'Lord Voldemort', salary:523.4},
]

const SideBar=(props) => {
  const [open, setOpen] =useState(true)
  const [data, setData] = useState([]);
  const [select, setSelect] = useState('');

  const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
	transition: theme.transitions.create(['margin', 'width'], {
	  easing: theme.transitions.easing.sharp,
	  duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
	  width: `calc(100% - ${drawerWidth}px)`,
	  marginLeft: `${drawerWidth}px`,
	  transition: theme.transitions.create(['margin', 'width'], {
		easing: theme.transitions.easing.easeOut,
		duration: theme.transitions.duration.enteringScreen,
	  }),
	}),
  }));

  const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	padding: theme.spacing(0, 1),
	...theme.mixins.toolbar,
	justifyContent: 'flex-end',
  }));

  useEffect (() => {
	setData(list);
	list? setSelect(list[0].name): setSelect('');
  },[]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const drawerlist = (
	<div className='sideleft'>
	<ListItemButton>
	<AccountCircleIcon />
		<ListItemText primary={select} />
	</ListItemButton>
	<Divider/>
      <List>
        {['Function 1', 'Function 2', 'Function 3', 'Function 4' ].map((el, index) => (
          <ListItem key={el} disablePadding>
            <ListItemButton>
                <PlagiarismIcon />
              <ListItemText primary={el} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
	  </div>
  );

	return (
		<Box sx={{ display: 'flex' }}>
		<CssBaseline/>
		<AppBar position="fixed" open={open}>
		  <Toolbar>
			<Box sx={{ width:1, maxHeight: 1 }}>
				{!open &&<IconButton
				color="inherit"
				aria-label="open drawer"
				onClick={handleDrawerOpen}
				edge="start"
				sx={{ mr: 2, ...{ display: 'block' }}}
          		>
			  <ChevronRightIcon />
			</IconButton> }
			<EmployeesList list={data}/>
			</Box>
			
		  </Toolbar>
		</AppBar>
		<Drawer
			sx={{
				width: drawerWidth,
				flexShrink: 0,
				'& .MuiDrawer-paper': {
				width: drawerWidth,
				boxSizing: 'border-box',
				background: 'lightgrey'
				},
			}}
			variant="persistent"
			anchor="left"
			open={open}
		>
		<DrawerHeader>
			<IconButton onClick={handleDrawerClose}>
				<ChevronLeftIcon />
			</IconButton>
        </DrawerHeader>
			{drawerlist}
		</Drawer>
    	</Box>
	  );
	};


export default SideBar;