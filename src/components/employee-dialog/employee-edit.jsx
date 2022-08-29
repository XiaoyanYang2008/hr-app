import  {useState} from 'react';
import {Button, Dialog, DialogContent, Typography} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@material-ui/core/TextField';
import { useSnackbar} from 'notistack';
import { makeStyles } from '@material-ui/core';

import * as actions from  '../../store/employee/employee.action';

const useStyles = makeStyles({
	dialog: {
	  position: 'center',
	  width: 320,
	},
	button: {
		color: 'white',
		backgroundColor: 'black',
		width: 250,
		height: 35,
		marginLeft: 10,
		'&:hover': {
			backgroundColor: 'black',
		},
	},
	title: {
		paddingBottom: 20,
	},
	text: {
		width: 270,     
		paddingLeft: 10,
		paddingRight: 10,
		paddingTop: 10,
		paddingBottom: 10,
		fontWeight: 500,
	}
  });

const EmployeeEditDialog=({dialogopen, employee, onUpdateSucess, onCancel}) => {
  const classes = useStyles();
  const [data, setData] = useState(employee);
  const {enqueueSnackbar} = useSnackbar();

  const { id, name, login , salary} = data;

  const handleChange = (event) => {
    const {name, value}  = event.target;
	if (event.target.type==='number') {
		const arr = value.split('.');
		if (value >=0) {
			if(arr.length < 2 ) {
				setData({ ...data, [name]: value });
			} else {
				if (arr[1].length <= 2) {
					setData({ ...data, [name]: value });
				}
			}
		}
	} else {
		setData({ ...data, [name]: value });
	}
  };

  const handleSubmit = (event) => {
    event.preventDefault();
	actions.updateEmployeeAsync(data)
	.then(() => {
		enqueueSnackbar('Update employee sucessfully', { variant: 'success'});
		onUpdateSucess(data)
	})
	.catch(() => {
		enqueueSnackbar('Update employee failed, please try again', { variant: 'error'});
	}
	);
  };

  return (
    <div>
      <Dialog
        onClose={onCancel}
        open={dialogopen}
		classes={{
			paper: classes.dialog
		  }}
      >
		<DialogContent className='content'>
		<IconButton
		className='icon'
        onClick={onCancel}
        >
        <CloseIcon/>
        </IconButton>
		<form onSubmit={handleSubmit}>
		<div ><Typography className={classes.title}>Employee id: {id} {name}</Typography></div>
		<TextField className={classes.text} label="Name" required variant="outlined" onChange={handleChange} name='name' value={name} />
		<TextField className={classes.text} label="Login" required variant="outlined" onChange={handleChange} name='login' value={login}  />
		<TextField className={classes.text} label="Salary" required variant="outlined" type='number' onChange={handleChange} name='salary' value={salary} />
          <Button type='submit' label={'Submit'} className={classes.button}>Submit
          </Button>
		  </form>
		  </DialogContent>
      </Dialog>
    </div>
  );
}

export default EmployeeEditDialog;
