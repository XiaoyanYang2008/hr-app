import { Fragment, useState } from 'react';
import MaterialTable from '@material-table/core';
import EditIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';

import SalarySearch from '../employees/salary-search';
import EmployeeUploadDialog from '../employee-dialog/employee-uploader';
import EmployeeEditDialog from '../employee-dialog/employee-edit';
import EmployeeRemoveDialog from '../employee-dialog/employee-remove';;

const EmployeesList = ({list}) => {
  const [data, setData]=useState(list);
  const [showUploadDialog, setShowUploadDialog]=useState(false);
  const [showEditDialog, setShowEditDialog]=useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [employee, setEmployee] = useState({})

  const tableactions=
	[
	{	icon: () =>  <AddIcon/>,
			isFreeAction: true,
			tooltip: 'Upload Employee file',
			onClick: (event) => uploadHandler()
	},
	{
	  icon: () => <EditIcon/>,
	  tooltip: 'Edit Employee',
	  onClick: (event, rowData) => updateHandler(rowData)
	},
	{
	  icon: () => <DeleteIcon/>,
	  tooltip: 'Delete Employee',
	  onClick: (event, rowData) => deleteHandler(rowData)
	},
  ]

  const cancelAction = () => {
	setShowUploadDialog(false);
	setShowEditDialog(false);
	setShowDeleteDialog(false);
}

  const uploadHandler = () => {
	setShowUploadDialog(true);
	setShowEditDialog(false);
	setShowDeleteDialog(false)
  }

  const deleteHandler = oldData => {
	setEmployee(oldData)
	setShowDeleteDialog(true)
	setShowEditDialog(false);
  };

  const updateHandler = (newData) => {
	setEmployee(newData)
	setShowEditDialog(true);
	setShowDeleteDialog(false)
  };

	const onUploadSucess =(newData) => {
		let newEmplist = newData;
		let newList = [...data]
		for (let i =0; i < newEmplist.length; i++) {
			const index = newList.findIndex(el => el.id ===newEmplist[i].id);
			if (index>=0) {
				newList[index] = newEmplist[i]
			} else {
				newList.push(newEmplist[i])
			}
		}
		setData(newList)
		cancelAction()
	}

	const onDeleteSucess = (empData) => {
		const dataDelete = [...data];
		const index = data.findIndex(el => el.id ===empData.id);
		dataDelete.splice(index, 1);
		setData(dataDelete);
		cancelAction()
	}

	const onUpdateSucess = (empData) => {
		const dataUpdate = [...data];
		const index = data.findIndex(el => el.id ===empData.id);
		dataUpdate[index] = empData;
		setData(dataUpdate);
		cancelAction()
	}

	const onSearchSucess =(newList) => {
		setData(newList);
	}

  return (
    <Fragment>
		<SalarySearch employeeList={data} onSearchSucess = {onSearchSucess}/>
        <MaterialTable
          columns={[
            { title: 'Id', field: 'id', align: "left" ,	},
            { title: 'Login', field: 'login', type: 'numeric', align: "left" },
            { title: 'Name', field: 'name', type: 'numeric', align: "left" },
            { title: 'Salary', field: 'salary', type: 'numeric',align: "left" },
          ]}
		  data={data}
          title="Employees"
		  options={{actionsColumnIndex: -1,pageSize:10,maxBodyHeight: 400}}
		  actions = {tableactions}
        />
		{showEditDialog? <EmployeeEditDialog 
		dialogopen={showEditDialog} 
		employee={employee} 
		onUpdateSucess ={onUpdateSucess}
		onCancel={cancelAction}/>: null}
		{showDeleteDialog? <EmployeeRemoveDialog
            title={'Remove "' + (employee.name) + '"'}
            employee={employee}
            visible={showDeleteDialog}
            onDeleteSucess={onDeleteSucess}
            onCancel={cancelAction}
        />: null}
		{showUploadDialog? <EmployeeUploadDialog
            dialogopen={showUploadDialog}
            onUploadSucess={onUploadSucess}
            onCancel={cancelAction}
        />: null}

	</Fragment>
  );
};

export default EmployeesList;
