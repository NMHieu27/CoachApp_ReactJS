import React, { useMemo } from 'react';
import './DataTable.scss';
import { useTable, useSortBy, usePagination } from 'react-table';
import MOCK_DATA from './MOCK_DATA.json';
import Column from './Colum';

function DataTable() {
    const columns = useMemo(() => Column, []);
    const data = useMemo(() => MOCK_DATA, []);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        state,
        gotoPage,
        pageCount,
        setPageSize,
        prepareRow,
    } = useTable(
        {
            columns,
            data,
            initialState: {
                pageSize: 9,
            },
        },
        useSortBy,
        usePagination,
    );
    const { pageIndex } = state;

    return (
        <div>
            <table className="table table-striped table-hover" {...getTableProps()}>
                <thead className="">
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render('Header')}
                                    <span>
                                        {' '}
                                        {column.isSorted ? (
                                            column.isSortedDesc ? (
                                                <i class="fa-solid fa-arrow-down"></i>
                                            ) : (
                                                <i class="fa-solid fa-arrow-up"></i>
                                            )
                                        ) : (
                                            ''
                                        )}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div className="d-flex justify-content-between border-top" id="table-pagination">
                <div className="text-left my-2 ml-2">
                    <span>
                        Page{' '}
                        <strong>
                            {pageIndex + 1} of {pageOptions.length}
                        </strong>{' '}
                    </span>
                    <span>
                        | Go to page :{' '}
                        <input
                            type="number"
                            className="form-control w-25 d-inline"
                            min="1"
                            max={pageOptions.length}
                            required
                            defaultValue={pageIndex + 1}
                            onChange={(e) => {
                                const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;
                                gotoPage(pageNumber);
                            }}
                        />
                    </span>
                </div>
                <div className="text-right my-2 mr-4">
                    <button onClick={() => gotoPage(0)} disabled={!canPreviousPage} className="btn btn-info">
                        <i class="fa-solid fa-angles-left text-light"></i>
                    </button>
                    <button onClick={() => previousPage()} disabled={!canPreviousPage} className="btn btn-info">
                        <b className="text-light">Previous</b>
                    </button>
                    <button onClick={() => nextPage()} disabled={!canNextPage} className="btn btn-info">
                        <b className="text-light">Next</b>
                    </button>
                    <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} className="btn btn-info">
                        <i class="fa-solid fa-angles-right text-light"></i>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DataTable;
