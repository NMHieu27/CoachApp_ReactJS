import numberWithCommas from '~/utils/numberWithCommas';

const dayColumns = [
    { title: 'Ngày', field: 'date' },
    { title: 'Thu nhập', field: 'total', render: (rowData) => `${numberWithCommas(rowData.total)} đ` },
];
export default dayColumns;
