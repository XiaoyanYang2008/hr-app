import axios from '../axios';

export const uploadEmployeesAsync= async ( employees) => {
    try {
        const res = await axios.post('/employees/upload', employees);
		return res.data
    } catch (err) {
        throw Error(err.response);
    }
};

export const getEmployeesAsync= async () => {
    try {
		const res = await axios.get('/emplyees');
		return res.data;
    } catch (err) {
        throw Error(err.response);
    }
};

export const updateEmployeeAsync= async ( employee) => {
    try {
        await axios.put('/employees/' + employee.id, employee);
    } catch (err) {
        throw Error(err.response);
    }
};

export const removeEmployeeAsync= async ( employee) => {
    try {
        await axios.delete('/employees/' + employee.id);
    } catch (err) {
        throw Error(err.response);
    }
};
