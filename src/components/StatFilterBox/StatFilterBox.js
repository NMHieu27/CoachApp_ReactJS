import './StatFilterBox.scss';
function StatFilterBox({
    setData,
    filterSelected,
    setFilterSelected,
    monthFilterByMonth,
    setMonthFilterByMonth,
    quarterFilterByQuarter,
    setQuarterFilterByQuarter,
    year,
    setYear,
    onClick,
}) {
    const statFilter = [
        { id: 1, name: 'month', title: 'Theo tháng' },
        { id: 2, name: 'quarter', title: 'Theo quý' },
        { id: 3, name: 'year', title: 'Theo năm' },
    ];
    return (
        <div class="row">
            <div class="col-md-3">
                <label class="form-label" for="statFilter">
                    Thống kê theo
                </label>
                <select
                    id="statFilter"
                    class="form-select form-select-lg mb-3"
                    aria-label=".form-select-lg example"
                    onChange={(e) => {
                        setFilterSelected(+e.target.value);
                        setData();
                    }}
                >
                    {statFilter.map((filter) => (
                        <option selected={filterSelected === filter.id} value={filter.id}>
                            {filter.title}
                        </option>
                    ))}
                </select>
            </div>
            <div class="col-md-7">
                {/* filter by month*/}
                {filterSelected === 1 && (
                    <div className="row">
                        <div className="col-md-6 mb-2 pb-2">
                            <label className="form-label" htmlFor="monthFilterByMonth">
                                Tháng
                            </label>
                            <div className="form-outline">
                                <input
                                    type="number"
                                    min={1}
                                    max={12}
                                    id="monthFilterByMonth"
                                    name="monthFilterByMonth"
                                    className="form-control form-control-lg"
                                    value={monthFilterByMonth}
                                    onChange={(e) => setMonthFilterByMonth(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="col-md-6 mb-2 pb-2">
                            <label className="form-label" htmlFor="yearFilterByMonth">
                                Năm
                            </label>
                            <div className="form-outline">
                                <input
                                    type="number"
                                    min={1970}
                                    max={new Date().getFullYear()}
                                    id="yearFilterByMonth"
                                    name="yearFilterByMonth"
                                    className="form-control form-control-lg"
                                    value={year}
                                    onChange={(e) => setYear(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* filter by quarter*/}
                {filterSelected === 2 && (
                    <div className="row">
                        <div className="col-md-6 mb-2 pb-2">
                            <label className="form-label" htmlFor="quarterFilterByQuarter">
                                Quý
                            </label>
                            <div className="form-outline">
                                <input
                                    type="number"
                                    min={1}
                                    max={4}
                                    id="quarterFilterByQuarter"
                                    name="quarterFilterByQuarter"
                                    className="form-control form-control-lg"
                                    value={quarterFilterByQuarter}
                                    onChange={(e) => setQuarterFilterByQuarter(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="col-md-6 mb-2 pb-2">
                            <label className="form-label" htmlFor="yearFilterByQuarter">
                                Năm
                            </label>
                            <div className="form-outline">
                                <input
                                    type="number"
                                    min={1970}
                                    max={new Date().getFullYear()}
                                    id="yearFilterByQuarter"
                                    name="yearFilterByQuarter"
                                    className="form-control form-control-lg"
                                    value={year}
                                    onChange={(e) => setYear(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* filter by quarter*/}
                {filterSelected === 3 && (
                    <div className="col-md-12 mb-2 pb-2">
                        <label className="form-label" htmlFor="year">
                            Năm
                        </label>
                        <div className="form-outline">
                            <input
                                type="number"
                                min={1970}
                                max={new Date().getFullYear()}
                                id="year"
                                name="year"
                                className="form-control form-control-lg"
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                            />
                        </div>
                    </div>
                )}
            </div>
            <div className="col-md-2">
                <div className="col-md-12 text-center" style={{ paddingTop: '2.3rem' }}>
                    <button className=" btn-lg btn-handle-primary text-light" onClick={onClick}>
                        {' '}
                        Thống kê
                    </button>
                </div>
            </div>
        </div>
    );
}

export default StatFilterBox;
