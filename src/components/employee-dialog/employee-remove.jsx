import {Button, Dialog} from '@material-ui/core';
import {DialogContent} from '@material-ui/core';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import {useSnackbar} from 'notistack';
import { makeStyles } from '@material-ui/core';

import * as actions from '../../store/employee/employee.action';

const useStyles = makeStyles({
	dialog: {
	  position: 'center',
	  width: 400,
	},
	button: {
		color: 'white',
		backgroundColor: 'black',
		width: 330,
		height: 35,
		marginLeft: 10,
		'&:hover': {
			backgroundColor: 'black',
		},
	}
  });

const EmployeeRemoveDialog = ({title, employee, visible, onDeleteSucess, onCancel}) => {
	const classes = useStyles();
	const {enqueueSnackbar} = useSnackbar();

	const confirmDelete =(event) =>{
		actions.removeEmployeeAsync(employee)
		.then(() => {
			enqueueSnackbar('Delete employee sucessfully', { variant: 'success'});
			onDeleteSucess(employee);
		})
		.catch(() => {
			enqueueSnackbar('Delete employee failed, please try again', { variant: 'error'});
		})
	};

    return (
        <Dialog
            open={visible}
            onClose={onCancel}
            classes={{
				paper: classes.dialog
			  }}
        >
            <DialogContent>
			{title}
			<DialogContentText>{'Are you sure you remove this employee?'}</DialogContentText>
			</DialogContent>
            <DialogActions>
                <Button onClick={onCancel} label={'Cancel'} className={classes.button}>Cancel</Button>
                <Button onClick={confirmDelete} label={'OK'} className={classes.button}>Ok</Button>
            </DialogActions>
        </Dialog>
    );
}

export default EmployeeRemoveDialog;
