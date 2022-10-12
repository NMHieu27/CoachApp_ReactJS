import { format } from 'date-fns';

const Column = [
    {
        Header: 'Id',
        accessor: 'id',
    },
    {
        Header: 'First Name',
        accessor: 'first_name',
    },
    {
        Header: 'Last Name',
        accessor: 'last_name',
    },
    {
        Header: 'Email',
        accessor: 'email',
    },
    {
        Header: 'Gender',
        accessor: 'gender',
    },
    {
        Header: 'Date of birth',
        accessor: 'date_of_birth',
        Cell: ({ value }) => {
            return format(new Date(value), 'dd/MM/yyyy');
        },
    },
];
export default Column;
