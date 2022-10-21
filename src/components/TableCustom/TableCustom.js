import { Link } from 'react-router-dom';
import MaterialTable from 'material-table';
function TableCustom({ data, columns, title = '', link, isAddButton, ...props }) {
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
                options={{
                    exportButton: true,
                    headerStyle: {
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
