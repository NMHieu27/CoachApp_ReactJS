import numberWithCommas from '~/utils/numberWithCommas';

const yearColumns = [
    { title: 'Tháng', field: 'month' },
    { title: 'Năm', field: 'year' },
    { title: 'Thu nhập', field: 'total', render: (rowData) => `${numberWithCommas(rowData.total)} đ` },
];
export default yearColumns;
