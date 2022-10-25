import './TableCustom.scss';
import { Link } from 'react-router-dom';
import MaterialTable from 'material-table';
import { useState } from 'react';
function TableCustom({ data, columns, title = '', link, isAddButton, ...props }) {
    const [selectedRow, setSelectedRow] = useState(null);
    return (
        <div>
            {isAddButton && (
                <Link to={link}>
                    <button className="btn-handle btn-handle-primary">
                        <i class="fa-solid fa-plus"></i> Thêm
                    </button>
                </Link>
            )}

            <MaterialTable
                title={title}
                columns={columns}
                data={data}
                onRowClick={(evt, selectedRow) => setSelectedRow(selectedRow.tableData.id)}
                options={{
                    exportButton: true,
                    headerStyle: {
                        background: 'var(--second-color)',
                        color: 'white',
                        fontSize: '18px',
                        fontWeight: 'bold',
                    },
                    rowStyle: {
                        fontSize: '16px',
                    },
                }}
                {...props}
            />
        </div>
    );
}

export default TableCustom;
