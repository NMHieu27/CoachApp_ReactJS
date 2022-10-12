import React, { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import TableFilter from './TableFilter';
import './Table.scss';
function Table(props) {
    const [accountList, setAccountList] = useState(props.bodyData);
    const [keyword, setKeyword] = useState('');
    const [limit, setLimit] = useState(props.limit);

    useEffect(() => {
        const rerenderData = () => {
            const result = props.bodyData.filter((item) => item.phone.includes(keyword));
            if (result.length > 0) {
                setAccountList(result);
            }
        };
        rerenderData();
    }, [keyword]);

    const handleSearch = () => {
        console.log(keyword);
        const result = accountList.filter((value) => {
            return value.phone.includes(keyword);
        });
        if (result.length > 0) {
            setAccountList(result);
        }
    };

    const initDataShow = +limit && accountList ? accountList.slice(0, +limit) : accountList;
    const [dataShow, setDataShow] = useState(initDataShow);

    let pages = 1;
    let range = [];

    useEffect(() => {
        setDataShow(initDataShow);
        setLimit(limit);
    }, [accountList, limit]);

    if (limit !== undefined) {
        let page = Math.floor(props.bodyData.length / Number(limit));
        pages = props.bodyData.length % Number(limit) === 0 ? page : page + 1;
        range = [...Array(pages).keys()];
    }

    const [currPage, setCurrPage] = useState(0);
    const selectPage = (page) => {
        const start = Number(limit) * page;
        const end = start + Number(limit);

        setDataShow(props.bodyData.slice(start, end));
        setCurrPage(page);
    };
    return (
        <div>
            <div className="table-wrapper">
                <div className="accounts-management__data-table__filter">
                    <TableFilter
                        maxLimit={accountList.length}
                        limit={limit}
                        setLimit={setLimit}
                        keyword={keyword}
                        setKeyword={setKeyword}
                        placeholder={props.placeholder}
                        onClick={handleSearch}
                    />
                </div>
                <table>
                    {props.headData && props.renderHead ? (
                        <thead>
                            <tr>{props.headData.map((item, index) => props.renderHead(item, index))}</tr>
                        </thead>
                    ) : null}
                    {props.bodyData && props.renderBody ? (
                        <tbody>{dataShow.map((item, index) => props.renderBody(item, index))}</tbody>
                    ) : null}
                </table>
            </div>
            {pages > 1 ? (
                <div className="table__pagination">
                    {/* {range.map((item, index) => (
                        <div
                            key={index}
                            className={`table__pagination-item ${currPage === index ? 'active-page' : ''}`}
                            onClick={() => selectPage(index)}
                        >
                            {item + 1}
                        </div>
                    ))} */}
                    <Pagination
                        count={range.length}
                        onChange={(e, value) => selectPage(value - 1)}
                        showFirstButton
                        showLastButton
                        style={{ position: 'static', background: 'white', zIndex: 1 }}
                    />
                </div>
            ) : null}
        </div>
    );
}

export default Table;
