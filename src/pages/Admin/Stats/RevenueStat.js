import { yellow } from '@mui/material/colors';
import { fi } from 'date-fns/locale';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import statsAPI from '~/api/statsAPI';
import BarChart from '~/components/Chart/BarChart';
import LineChart from '~/components/Chart/LineChart';
import Helmet from '~/components/Helmet/Helmet';
import StatFilterBox from '~/components/StatFilterBox/StatFilterBox';
import TableCustom from '~/components/TableCustom/TableCustom';
import config from '~/config';
import revenueStatByDate from '~/fakedata/revenueStatByDate';
import revenueStatByMonth from '~/fakedata/revenueStatByMonth';
import revenueStatByQuarter from '~/fakedata/revenueStatByQuarter';
import revenueStatByYear from '~/fakedata/revenueStatByYear';
import formatDate from '~/utils/formatDate';
import dayColumns from './dayColumns';
import monthColumns from './monthColumns';
import quarterColumns from './quarterColumns';
import './RevenueStat.scss';
import yearColumns from './yearColumns';
function RevenueStat() {
    const [revenueData, setRevenueData] = useState();
    const [filterSelected, setFilterSelected] = useState(1);
    const [fromDate, setFromDate] = useState(formatDate.fFullDate(new Date()));
    const [toDate, setToDate] = useState(formatDate.fFullDate(new Date()));
    const [monthFilterByMonth, setMonthFilterByMonth] = useState(+new Date().getMonth() + 1);
    const [quarterFilterByQuarter, setQuarterFilterByQuarter] = useState(1);
    const [year, setYear] = useState(+new Date().getFullYear());

    useEffect(() => {
        setDataStat({
            labels:
                filterSelected === 1
                    ? revenueData?.map((data) => `${data.date}`)
                    : filterSelected === 2
                    ? revenueData?.map((data) => `${data.date}`)
                    : filterSelected === 3
                    ? revenueData?.map((data) => `${data.month} / ${data.year}`)
                    : revenueData?.map((data) => `${data.month} / ${data.year}`),

            datasets: [
                {
                    label: 'Thu nhập',
                    data: revenueData?.map((data) => data.total),
                    backgroundColor: colors,
                    borderColor: borderColors,
                    borderWidth: 1,
                },
            ],
        });
    }, [revenueData]);

    //Random color
    let colors = [];
    let borderColors = [];
    let r, g, b;
    for (const data in revenueData) {
        r = Math.random() * 255;
        g = Math.random() * 255;
        b = Math.random() * 255;
        colors.push(`rgba(${r}, ${g}, ${b}, 0.4)`);
        borderColors.push(`rgba(${r}, ${g}, ${b}, 1)`);
    }

    // Set up data for stat
    const [dataStat, setDataStat] = useState();
    const handleStat = async () => {
        switch (filterSelected) {
            case 1:
                // try {
                //     const response1 = await statsAPI.getRevenueStatsByDay(fromDate, toDate);
                //     if (response1 === 200) {
                //         toast.success('Thống kê thành công! ', { theme: 'colored' });
                //         setRevenueData(response1.data);
                //     } else {
                //         toast.error('Thống kê thất bại! ' + response1.message, { theme: 'colored' });
                //         throw new Error(response1.message);
                //     }
                // } catch (error) {
                //     toast.error('Lỗi !' + error.message, { theme: 'colored' });
                // }
                setRevenueData(revenueStatByDate);
                break;

            case 2:
                // try {
                //     const response2 = await statsAPI.getRevenueStatsByMonth(monthFilterByMonth, year);
                //     if (response2 === 200) {
                //         toast.success('Thống kê thành công! ', { theme: 'colored' });
                //         setRevenueData(response2.data);
                //     } else {
                //         toast.error('Thống kê thất bại! ' + response2.message, { theme: 'colored' });
                //         throw new Error(response2.message);
                //     }
                // } catch (error) {
                //     toast.error('Lỗi !' + error.message, { theme: 'colored' });
                // }
                setRevenueData(revenueStatByMonth);
                break;

            case 3:
                // try {
                //     const response3 = await statsAPI.getRevenueStatsByQuarter(quarterFilterByQuarter, year);
                //     if (response3 === 200) {
                //         toast.success('Thống kê thành công! ', { theme: 'colored' });
                //         setRevenueData(response3.data);
                //     } else {
                //         toast.error('Thống kê thất bại! ' + response3.message, { theme: 'colored' });
                //         throw new Error(response3.message);
                //     }
                // } catch (error) {
                //     toast.error('Lỗi !' + error.message, { theme: 'colored' });
                // }
                setRevenueData(revenueStatByQuarter);
                break;

            default:
                // try {
                //     const response4 = await statsAPI.getRevenueStatsByYear(year);
                //     if (response4 === 200) {
                //         toast.success('Thống kê thành công! ', { theme: 'colored' });
                //         setRevenueData(response4.data);
                //     } else {
                //         toast.error('Thống kê thất bại! ' + response4.message, { theme: 'colored' });
                //         throw new Error(response4.message);
                //     }
                // } catch (error) {
                //     toast.error('Lỗi !' + error.message, { theme: 'colored' });
                // }
                setRevenueData(revenueStatByYear);
                break;
        }
    };
    return (
        <Helmet title="Thống kê doanh thu">
            <div className="revenue-stat">
                <div
                    className="revenue-stat__breadcrumb"
                    style={{
                        background: 'white',
                        borderRadius: '5px',
                        padding: '15px',
                    }}
                >
                    <Link style={{ color: 'blue' }} to={config.routes.admin}>
                        Admin home
                    </Link>
                    <span>{` / `}</span>
                    <span>Thống kê doanh thu</span>
                </div>
                <div className="revenue-stat__content bg-white mt-2">
                    <h2 className="text-center" style={{ color: 'var(--second-color)' }}>
                        Thống kê doanh thu
                    </h2>
                    <div className="revenue-stat__filter mb-2 p-4">
                        <StatFilterBox
                            setRevenueData={setRevenueData}
                            filterSelected={filterSelected}
                            setFilterSelected={setFilterSelected}
                            fromDate={fromDate}
                            setFromDate={setFromDate}
                            toDate={toDate}
                            setToDate={setToDate}
                            monthFilterByMonth={monthFilterByMonth}
                            setMonthFilterByMonth={setMonthFilterByMonth}
                            quarterFilterByQuarter={quarterFilterByQuarter}
                            setQuarterFilterByQuarter={setQuarterFilterByQuarter}
                            year={year}
                            setYear={setYear}
                            onClick={handleStat}
                        />
                    </div>
                    <div className="row m-0">
                        <div className="col-md-6 revenue-stat__content__table">
                            {revenueData && (
                                <div className=" card" style={{ position: 'static' }}>
                                    <div className="card__body">
                                        <TableCustom
                                            columns={
                                                filterSelected === 1
                                                    ? dayColumns
                                                    : filterSelected === 2
                                                    ? monthColumns
                                                    : filterSelected === 3
                                                    ? quarterColumns
                                                    : yearColumns
                                            }
                                            data={revenueData}
                                            title={
                                                filterSelected === 1
                                                    ? `Doanh thu từ ngày ${formatDate.fFullDateDDFirst(
                                                          fromDate,
                                                      )} đến ${formatDate.fFullDateDDFirst(toDate)}`
                                                    : filterSelected === 2
                                                    ? `Doanh thu tháng ${monthFilterByMonth}/${year}`
                                                    : filterSelected === 3
                                                    ? `Doanh thu quý ${quarterFilterByQuarter} năm ${year}`
                                                    : `Doanh thu năm ${year}`
                                            }
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="col-md-6 revenu-stat__content__chart">
                            {revenueData && (
                                <div>
                                    <LineChart chartData={dataStat} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Helmet>
    );
}

export default RevenueStat;
