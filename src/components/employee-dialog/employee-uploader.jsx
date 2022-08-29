
import { Fragment, useState } from "react";
import {Dialog,  DialogContent, Fab, Grid, CardContent, Typography} from '@material-ui/core';
import {Button} from "@material-ui/core";
import IconButton from '@mui/material/IconButton';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';
import {useSnackbar} from 'notistack';
import Papa from "papaparse";
import { makeStyles } from '@material-ui/core';

import * as actions from '../../store/employee/employee.action';

const useStyles = makeStyles({
	dialog: {
	  position: 'center',
	  width: 300,
	},
	button: {
		position: 'center',
		color: 'white',
		backgroundColor: 'black',
		width: 210,
		height: 35,
		marginLeft: 10,
		'&:hover': {
			backgroundColor: 'black',
		},
	},
	icon: {
		position: 'center',
	},
	file: {
		position: 'center',
		color: 'blue',
		marginTop: 10,
		marginBottom: 10,
	}
  });

const checkError =(empList) => {
	let newEmplist = []
	let idList = []
	let loginList =[]

	for ( let i=0; i<empList.length; i++) {
		if (idList.includes(empList[i].id)) {
			return [true, 'There is duplicated id or login in the file!', []]
		} else {
			idList.push(empList[i].id)
		}
		
		if (loginList.includes(empList[i].login)) {
			return [true, 'There is duplicated id or login in the file!', []]
		} else {
			loginList.push(empList[i].login)
		}

		if (!empList[i].id || !empList[i].login || !empList[i].name || !empList[i].salary) {
			return [true, 'Not all the columns be filled in the file!', []]
		}

		if (empList[i].id.trim().startsWith('#') || empList[i].login.trim().startsWith('#') 
		|| empList[i].name.trim().startsWith('#') || empList[i].salary.trim().startsWith('#')) {
			continue;
		}

		newEmplist.push(empList[i])
	}

	return [false, '', newEmplist]
}

const EmployeeUploadDialog = ({ dialogopen, onCancel, onUploadSucess}) => {
	const classes = useStyles();
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
				let checkData = checkError(empData);
				if (checkData[0]) {
					return enqueueSnackbar(checkData[1], { variant: 'error'});
				}
				setFile(file)
				setFileLoaded(true)
				setFilename(file.name)
				setData(checkData[2])
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
		classes={{
			paper: classes.dialog
		  }}
      >
		<DialogContent>
		<IconButton
          onClick={onCancel}
		  className={classes.icon}
        >
        <CloseIcon/>
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
				<Fab component="span" className={classes.icon}>
						<CloudUploadIcon className={classes.icon}/>
				</Fab>
			</label>
		</Grid>
		<Grid>
		<Grid className={classes.file}>
		<Typography>{filename}</Typography>
		</Grid>
		<Button className={classes.button} label={'Submit'} onClick={handleSubmit} disabled = {!fileLoaded}>Submit</Button>
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
        