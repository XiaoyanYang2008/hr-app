import  {useState} from 'react';
import {Button, Dialog, DialogContent, Typography} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@material-ui/core/TextField';
import { useSnackbar} from 'notistack';

import './employee-edit.style.css';
import * as actions from  '../../store/employee/employee.action';

const EmployeeEditDialog=({dialogopen, employee, onUpdateSucess, onCancel}) => {
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
		className='dialog'
      >
		<DialogContent className='content'>
		<IconButton
		className='icon'
        onClick={onCancel}
        >
        <CloseIcon onClick={onCancel}/>
        </IconButton>
		<form onSubmit={handleSubmit}>
		<Typography>Employee id: {id} {name}</Typography>
		<TextField className='text' label="Name" required variant="outlined" onChange={handleChange} name='name' value={name} />
		<TextField className='text' label="Login" required variant="outlined" onChange={handleChange} name='login' value={login}  />
		<TextField className='text' label="Salary" required variant="outlined" type='number' onChange={handleChange} name='salary' value={salary} />
          <Button type='submit' label={'Submit'} className="button">Submit
          </Button>
		  </form>
		  </DialogContent>
      </Dialog>
    </div>
  );
}

export default EmployeeEditDialog;
