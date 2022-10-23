import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import statsAPI from '~/api/statsAPI';
import Helmet from '~/components/Helmet/Helmet';
import StatFilterBox from '~/components/StatFilterBox/StatFilterBox';
import TableCustom from '~/components/TableCustom/TableCustom';
import config from '~/config';
import coachesStatByMonth from '~/fakedata/coachesStatByMonth';
import coachesStatByQuarter from '~/fakedata/coachesStatByQuarter';
import coachesStatByYear from '~/fakedata/coachesStatByYear';
import monthColumns from './monthColumns';
import quarterColumns from './quarterColumns';
import yearColumns from './yearColumns';
import PieChart from '~/components/Chart/PieChart';
function GarageCoachesStat() {
    const currentUserId = localStorage.getItem('userId');
    const [coachesData, setCoachesData] = useState();
    const [filterSelected, setFilterSelected] = useState(1);
    const [monthFilterByMonth, setMonthFilterByMonth] = useState(+new Date().getMonth() + 1);
    const [quarterFilterByQuarter, setQuarterFilterByQuarter] = useState(1);
    const [year, setYear] = useState(+new Date().getFullYear());

    useEffect(() => {
        setDataStat({
            labels:
                filterSelected === 1
                    ? coachesData?.map((data) => `${data.start_point} - ${data.end_point} ${data.month}/${data.year}`)
                    : filterSelected === 2
                    ? coachesData?.map(
                          (data) => `${data.start_point} - ${data.end_point} Quý ${data.quarter}-${data.year}`,
                      )
                    : coachesData?.map((data) => `${data.start_point} - ${data.end_point} Năm ${data.year}`),

            datasets: [
                {
                    label: 'Số chuyến',
                    data: coachesData?.map((data) => data.count),
                    backgroundColor: colors,
                    borderColor: borderColors,
                    borderWidth: 1,
                },
            ],
        });
    }, [coachesData]);

    //Random color
    let colors = [];
    let borderColors = [];
    let r, g, b;
    for (const data in coachesData) {
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
                //     const response2 = await statsAPI.garageGetCoachesStatsByMonth(monthFilterByMonth, year, currentUserId);
                //     if (response2 === 200) {
                //         toast.success('Thống kê thành công! ', { theme: 'colored' });
                //         setCoachesData(response2.data);
                //     } else {
                //         toast.error('Thống kê thất bại! ' + response2.message, { theme: 'colored' });
                //         throw new Error(response2.message);
                //     }
                // } catch (error) {
                //     toast.error('Lỗi !' + error.message, { theme: 'colored' });
                // }
                setCoachesData(coachesStatByMonth);
                break;

            case 2:
                // try {
                // const response3 = await statsAPI.garageGetCoachesStatsByQuarter(
                //         quarterFilterByQuarter,
                //         year,
                //         currentUserId,
                //     );
                //     if (response3 === 200) {
                //         toast.success('Thống kê thành công! ', { theme: 'colored' });
                //         setCoachesData(response3.data);
                //     } else {
                //         toast.error('Thống kê thất bại! ' + response3.message, { theme: 'colored' });
                //         throw new Error(response3.message);
                //     }
                // } catch (error) {
                //     toast.error('Lỗi !' + error.message, { theme: 'colored' });
                // }
                setCoachesData(coachesStatByQuarter);
                break;

            default:
                // try {
                // const response4 = await statsAPI.garageGetCoachesStatsByYear(year, currentUserId);
                //     if (response4 === 200) {
                //         toast.success('Thống kê thành công! ', { theme: 'colored' });
                //         setCoachesData(response4.data);
                //     } else {
                //         toast.error('Thống kê thất bại! ' + response4.message, { theme: 'colored' });
                //         throw new Error(response4.message);
                //     }
                // } catch (error) {
                //     toast.error('Lỗi !' + error.message, { theme: 'colored' });
                // }
                setCoachesData(coachesStatByYear);
                break;
        }
    };
    return (
        <Helmet title="Thống kê doanh thu">
            <div className="coaches-stat">
                <div
                    className="coaches-stat__breadcrumb"
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
                    <span>Thống kê mật độ chuyến xe</span>
                </div>
                <div className="coaches-stat__content bg-white mt-2">
                    <h2 className="text-center" style={{ color: 'var(--second-color)' }}>
                        Thống kê mật độ chuyến xe
                    </h2>
                    <div className="coaches-stat__filter mb-2 p-4">
                        <StatFilterBox
                            setData={setCoachesData}
                            filterSelected={filterSelected}
                            setFilterSelected={setFilterSelected}
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
                        <div className="col-md-6 coaches-stat__content__table">
                            {coachesData && (
                                <div className=" card" style={{ position: 'static' }}>
                                    <div className="card__body">
                                        <TableCustom
                                            columns={
                                                filterSelected === 1
                                                    ? monthColumns
                                                    : filterSelected === 2
                                                    ? quarterColumns
                                                    : yearColumns
                                            }
                                            data={coachesData}
                                            title={
                                                filterSelected === 1
                                                    ? `Mật độ chuyến xe tháng ${monthFilterByMonth}/${year}`
                                                    : filterSelected === 2
                                                    ? `Mật độ chuyến xe ${quarterFilterByQuarter} năm ${year}`
                                                    : `Mật độ chuyến xe ${year}`
                                            }
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="col-md-6 revenu-stat__content__chart">
                            {coachesData && (
                                <div>
                                    <PieChart chartData={dataStat} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Helmet>
    );
}

export default GarageCoachesStat;
