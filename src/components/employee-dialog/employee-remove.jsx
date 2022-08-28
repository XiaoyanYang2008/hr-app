import {Button, Dialog} from '@material-ui/core';
import {DialogContent} from '@material-ui/core';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import {useSnackbar} from 'notistack';

import './employee-remove.style.css';
import * as actions from '../../store/employee/employee.action';

const EmployeeRemoveDialog = ({title, employee, visible, onDeleteSucess, onCancel}) => {
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
            className='dialog'
        >
            <DialogContent>
			{title}
			<DialogContentText>{'Are you sure you remove this employee?'}</DialogContentText>
			</DialogContent>
            <DialogActions>
                <Button onClick={onCancel} label={'Cancel'} className='button'>Cancel</Button>
                <Button onClick={confirmDelete} label={'OK'} className='button'>Ok</Button>
            </DialogActions>
        </Dialog>
    );
}

export default EmployeeRemoveDialog;
