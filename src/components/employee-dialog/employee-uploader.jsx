
import { Fragment, useState } from "react";
import {Dialog,  DialogContent, Fab, Grid, CardContent, Typography} from '@material-ui/core';
import {Button} from "@material-ui/core";
import IconButton from '@mui/material/IconButton';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';
import {useSnackbar} from 'notistack';
import Papa from "papaparse";

import './employee-uploader.style.css';
import * as actions from '../../store/employee/employee.action';

const findDuplication =(empList) => {
	let idList = []
	let loginList =[]
	let duplicateId = false;
	let duplicateLogin = false;
	for ( let i=0; i<empList.length; i++) {
		if (idList.includes(empList[i].id)) {
			duplicateId = true;
			return [duplicateId, duplicateLogin]
		} else {
			idList.push(empList[i].id)
		}

		if (loginList.includes(empList[i].login)) {
			duplicateLogin = true;
			return [duplicateId, duplicateLogin]
		} else {
			loginList.push(empList[i].login)
		}
	}

	return [duplicateId, duplicateLogin]

}

const EmployeeUploadDialog = ({ dialogopen, onCancel, onUploadSucess}) => {
	const [file, setFile] = useState({});
	const [filename, setFilename]= useState('');
	const [fileLoaded, setFileLoaded] = useState(false);
	const [data, setData] = useState([]);
	const {enqueueSnackbar} = useSnackbar();

	const handleUploadClick = event => {
        const file = event.target.files[0];
        const fileTypes = /\/csv$/i;
		if (!fileTypes.test(file.type)) {
			return enqueueSnackbar('Only .csv file is allowed!', { variant: 'error'});
		} else if (file.size> 2048000) {
			return enqueueSnackbar('File size limit: 2 MB!', { variant: 'error'});
		}

		let empData=[]

		Papa.parse(file, {
			header: true,
			skipEmptyLines: true,
			complete: function(results) {
				empData =  results.data;
				let duplicate = findDuplication(empData);

				if (duplicate[0] || duplicate[1]) {
					return enqueueSnackbar('There is duplicated id or login in the file!', { variant: 'error'});
				}
				setFile(file)
				setFileLoaded(true)
				setFilename(file.name)
				setData(empData)
			}})
    };

	const handleSubmit = () => {
		actions.uploadEmployeesAsync(data)
		.then(() => {
			enqueueSnackbar('Upload employees sucessfully', { variant: 'success'});
			onUploadSucess(data);
		})
		.catch(() => {
			enqueueSnackbar('Upload employees failed, please try again', { variant: 'error'});
		})
	}

    return (
        <Fragment>
		<Dialog
        open={dialogopen}
		className='dialog'
      >
		<DialogContent>
		<IconButton
          onClick={onCancel}
        >
        <CloseIcon onClick={onCancel}/>
        </IconButton>
		<CardContent>
        <Typography
			color="textPrimary"
			gutterBottom
			>Upload Employee File Here</Typography>
			<Grid container className="loadicon">
				<input
					id="upload-file"
					accept=".csv"
					type="file"
					hidden
					onChange={handleUploadClick}
				/>
				<label htmlFor="upload-file">
				<Fab component="span">
						<CloudUploadIcon />
				</Fab>
			</label>
		</Grid>
		<Grid>
		<Grid className="file">
		<Typography>{filename}</Typography>
		</Grid>
		<Button className='button' label={'Submit'} onClick={handleSubmit} disabled = {!fileLoaded}>Submit</Button>
		</Grid>
		<Typography>
		</Typography>
            </CardContent>
		  </DialogContent>
      </Dialog>
		</Fragment>
    );
}

export default EmployeeUploadDialog;
        