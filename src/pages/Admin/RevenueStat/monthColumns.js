import numberWithCommas from '~/utils/numberWithCommas';

const monthColumns = [
    { title: 'Ngày', field: 'date' },
    { title: 'Thu nhập', field: 'total', render: (rowData) => `${numberWithCommas(rowData.total)} đ` },
];
export default monthColumns;
