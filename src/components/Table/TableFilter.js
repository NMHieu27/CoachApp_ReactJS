import './TableFilter.scss';
function TableFilter({
    maxLimit = 10,
    limit,
    setLimit,
    keyword,
    setKeyword,
    placeholder = 'Nhập từ cần tìm',
    onClick = () => {},
}) {
    return (
        <div className="table-filter">
            <div className="table-filter__limit">
                <div>Rows per page: </div>
                <input type="number" min={1} max={maxLimit} value={limit} onChange={(e) => setLimit(e.target.value)} />
            </div>
            <div className="table-filter__search">
                <input placeholder={placeholder} value={keyword} onChange={(e) => setKeyword(e.target.value)} />
                <button className="btn btn-primary" type="button" onClick={onClick}>
                    <i class="fa-solid fa-magnifying-glass"></i>
                </button>
            </div>
        </div>
    );
}

export default TableFilter;
