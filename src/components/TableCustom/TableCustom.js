import MaterialTable from 'material-table';
import { makeStyles } from '@material-ui/core';
const studentData = [
    {
        id: 1,
        name: 'Neeraj',
        email: 'neeraj@gmail.com',
        year: 2015,
        fee: 167000,
    },
    {
        id: 2,
        name: 'Vikas',
        email: 'vikas@gmail.com',
        year: 2013,
        fee: 785462,
    },

    {
        id: 3,
        name: 'Rahul',
        email: 'rahul@gmail.com',
        year: 2020,
        fee: 784596,
    },
];
function TableCustom() {
    const columns = [
        { title: 'Name', field: 'name' },
        { title: 'Email', field: 'email' },
        { title: 'Year', field: 'year', type: 'numeric' },
        { title: 'Fee', field: 'fee', type: 'currency' },
    ];

    return (
        <div className="hello">
            <h1 align="center">React-App</h1>
            <h4 align="center">Export Data to Excel in Material Table</h4>
            <MaterialTable title="Student Details" columns={columns} data={studentData} />
        </div>
    );
}

export default TableCustom;
