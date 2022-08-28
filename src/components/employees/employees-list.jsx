import { useState } from 'react';
import MaterialTable from '@material-table/core';
import EditIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';

const EmployeesList = ({list}) => {
  const [data, setData]=useState(list);

  const tableactions=
	[
	{	icon: () =>  <AddIcon/>,
			isFreeAction: true,
			tooltip: 'Upload Employee file',
	},
	{
	  icon: () => <EditIcon/>,
	  tooltip: 'Edit Employee',
	},
	{
	  icon: () => <DeleteIcon/>,
	  tooltip: 'Delete Employee',
	},

  ]

  return (
    <div style={{ maxWidth: '100%' }}>
        <MaterialTable
          columns={[
            { title: 'Id', field: 'id', width: 150,	},
            { title: 'Login', field: 'login', type: 'numeric'},
            { title: 'Name', field: 'name', type: 'numeric'},
            { title: 'Salary', field: 'salary', type: 'numeric',},
          ]}
		  data={data}
          title="Employees"
		  options={{actionsColumnIndex: -1,}}
		  actions = {tableactions}
        />

	</div>
  );
};

export default EmployeesList;
