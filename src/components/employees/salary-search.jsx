import {useState,Fragment } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import {Box, Card, Grid, TextField} from '@mui/material';
import {useSnackbar} from 'notistack';

import './salary-search.style.css';
import { IconButton } from '@material-ui/core';

const SalarySearch = ({employeeList, onSearchSucess}) => {
  const [min, setMin] = useState(1000);
  const [max, setMax] = useState(10000);
  const {enqueueSnackbar} = useSnackbar();

  const onchange = (event) => {
	const {name, value}  = event.target;
	const arr = value.split('.');
		if(arr.length < 2 ) {
			name === 'min'? 
			setMin(parseFloat(value)): setMax(parseFloat(value))
		} else {
			if (arr[1].length <= 2) {
				name === 'min'? 
				setMin(parseFloat(value)): setMax(parseFloat(value))
			}
		}
  }

  const onSearch =() => {
	if (min > max) {
		return enqueueSnackbar('Minimun is greater than Maximum, please set again', { variant: 'warning'});
	}
	const newList = [...employeeList].filter((el) => {return el.salary>= min && max >=el.salary})
	onSearchSucess(newList)
  }

  return (
    <Fragment>
		<Card className='card'>
		<Grid container>
		{/* <Grid item xs={2}><IconButton onClick={onSearch}><SearchIcon className='icon'/></IconButton></Grid>	 */}
		<Grid item xs={6}>
		<Box >
		<IconButton onClick={onSearch}><SearchIcon className='icon'/></IconButton>
			Minimum salary $ <TextField onChange={onchange} type='number' name='min' value={min}/>
		</Box>
		</Grid>
		<Grid item xs={6}>
			Maximum salary $ <TextField onChange={onchange} type='number' name='max' value={max}/>
		</Grid>
		</Grid>
		</Card>
	</Fragment>
  );
}

export default SalarySearch;

